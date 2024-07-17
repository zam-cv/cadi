use crate::{
    database::Database,
    models::{
        self,
        types::{PermissionType, RoleType},
    },
    utils,
};
use lazy_static::lazy_static;
use std::env;
use strum::IntoEnumIterator;

lazy_static! {
    pub static ref SECRET_KEY: String = env::var("SECRET_KEY").expect("SECRET_KEY must be set");
    pub static ref ROLES: Vec<models::types::RoleType> = models::types::RoleType::iter().collect();
    pub static ref PERMISSIONS: Vec<models::types::PermissionType> =
        models::types::PermissionType::iter().collect();
}

// constants
pub const HEADER_NAME: &str = "Authorization";
pub const COOKIE_NAME: &str = "Authorization";
pub const TOKEN_EXPIRATION_TIME: usize = 60 * 60 * 24 * 15; // 15 days
pub const MAX_POOL_SIZE: u32 = 5; // Database connection pool size

async fn apply_permissions(
    database: &Database,
    role_type: RoleType,
    permissions_type: Vec<PermissionType>,
) -> anyhow::Result<()> {
    let role = database.get_role_by_name(role_type.clone()).await?;
    let mut permissions: Vec<models::Permission> = Vec::new();

    for permission in permissions_type.iter() {
        let permission = database.get_permission_by_name(permission.clone()).await?;

        if let Some(permission) = permission {
            permissions.push(permission);
        }
    }

    if let Some(role) = role {
        for permission in permissions.iter() {
            if database
                .get_role_permission(role.id.unwrap(), permission.id.unwrap())
                .await?
                .is_some()
            {
                continue;
            }

            if let (Some(role_id), Some(permission_id)) = (role.id, permission.id) {
                database
                    .create_role_permission(models::RolePermission {
                        id: None,
                        role_id,
                        permission_id,
                    })
                    .await?;
            }
        }
    }

    Ok(())
}

async fn create_roles(database: &Database) -> anyhow::Result<()> {
    for role in ROLES.iter() {
        if database.get_role_by_name(role.clone()).await?.is_some() {
            continue;
        }

        database
            .create_role(models::Role {
                id: None,
                name: role.clone(),
            })
            .await?;
    }

    for permission in PERMISSIONS.iter() {
        if database
            .get_permission_by_name(permission.clone())
            .await?
            .is_some()
        {
            continue;
        }

        database
            .create_permission(models::Permission {
                id: None,
                name: permission.clone(),
            })
            .await?;
    }

    apply_permissions(
        database,
        RoleType::Admin,
        vec![
            PermissionType::SeeDashboard,
            PermissionType::SeeStudents,
            PermissionType::SeeReports,
            PermissionType::SeeTherapists,
            PermissionType::SeeCalculator,
            PermissionType::SeeProductionReports,
            PermissionType::EnrollStudents,
            PermissionType::EnrollTherapists,
            PermissionType::MakeProductionReports,
            PermissionType::MakeReports,
        ],
    )
    .await?;

    apply_permissions(
        database,
        RoleType::Therapist,
        vec![PermissionType::MakeReports],
    )
    .await?;

    apply_permissions(
        database,
        RoleType::Student,
        vec![
            // TODO: Add student permissions
        ],
    )
    .await?;

    apply_permissions(
        database,
        RoleType::Relative,
        vec![PermissionType::SeeReportsAsRelative],
    )
    .await?;

    Ok(())
}

async fn create_default_admin(database: &Database) -> anyhow::Result<()> {
    let email = env::var("ADMIN_DEFAULT_EMAIL").expect("ADMIN_DEFAULT_EMAIL must be set");
    let password = env::var("ADMIN_DEFAULT_PASSWORD").expect("ADMIN_DEFAULT_PASSWORD must be set");

    match database.get_user_by_email(email.clone()).await? {
        Some(_) => {
            log::info!("Admin already exists");
            Ok(())
        }
        None => match utils::hash_password(&password.clone()) {
            Ok(hash) => {
                let role_id = database
                    .get_role_by_name(RoleType::Admin)
                    .await?
                    .expect("Admin role not found")
                    .id
                    .expect("Admin role id not found");

                let new_admin = models::User {
                    id: None,
                    email,
                    password: hash,
                    role_id,
                };

                database.create_user(new_admin).await?;
                log::info!("Admin created");
                Ok(())
            }
            Err(_) => {
                log::error!("Failed to hash password");
                Err(anyhow::anyhow!("Failed to hash password"))
            }
        },
    }
}

pub async fn database_setup(database: &Database) {
    // Create the roles and permissions
    create_roles(database).await.unwrap();

    // Create the default admin
    create_default_admin(database).await.unwrap();
}
