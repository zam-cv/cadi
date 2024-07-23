use crate::{config, models, schema};
use actix_web::web;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager, PooledConnection};
use std::env;

pub trait DbResponder<T> {
    fn to_web(self) -> actix_web::Result<T, actix_web::Error>;
}

impl<T: serde::Serialize> DbResponder<T> for anyhow::Result<T> {
    fn to_web(self) -> actix_web::Result<T, actix_web::Error> {
        match self {
            Ok(data) => Ok(data),
            Err(e) => {
                log::error!("Database error: {:?}", e);
                Err(actix_web::error::ErrorBadRequest("Failed"))
            }
        }
    }
}

pub type DBPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[derive(Clone)]
pub struct Database {
    pub pool: DBPool,
}

impl Database {
    pub fn new() -> Self {
        let manager = ConnectionManager::<PgConnection>::new(
            env::var("DATABASE_URL").expect("DATABASE_URL must be set"),
        );

        let pool = r2d2::Pool::builder()
            // Set the maximum number of connections to the database
            .max_size(config::MAX_POOL_SIZE)
            .build(manager)
            .expect("Failed to create pool.");

        Database { pool }
    }

    pub fn get_connection(
        &self,
    ) -> anyhow::Result<PooledConnection<ConnectionManager<PgConnection>>> {
        self.pool.get().map_err(|e| anyhow::anyhow!(e))
    }

    pub async fn query_wrapper<F, T>(&self, f: F) -> anyhow::Result<T>
    where
        F: FnOnce(&mut PgConnection) -> Result<T, diesel::result::Error> + Send + 'static,
        T: Send + 'static,
    {
        let mut conn = self.get_connection()?;

        // Execute the query
        let result = web::block(move || f(&mut conn))
            .await
            .map_err(|e| {
                log::error!("Database error: {:?}", e);
                anyhow::anyhow!(e)
            })?
            .map_err(|e| {
                log::error!("Database error: {:?}", e);
                anyhow::anyhow!(e)
            })?;

        Ok(result)
    }

    pub async fn create_role(&self, new_role: models::Role) -> anyhow::Result<i32> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::roles::table)
                .values(&new_role)
                .returning(schema::roles::id)
                .get_result(conn)
        })
        .await
    }

    pub async fn create_permission(
        &self,
        new_permission: models::Permission,
    ) -> anyhow::Result<i32> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::permissions::table)
                .values(&new_permission)
                .returning(schema::permissions::id)
                .get_result(conn)
        })
        .await
    }

    pub async fn create_role_permission(
        &self,
        new_role_permission: models::RolePermission,
    ) -> anyhow::Result<()> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::role_permissions::table)
                .values(&new_role_permission)
                .execute(conn)
                .map(|_| ())
        })
        .await
    }

    pub async fn create_user(&self, new_user: models::User) -> anyhow::Result<i32> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::users::table)
                .values(&new_user)
                .returning(schema::users::id)
                .get_result(conn)
        })
        .await
    }

    pub async fn get_role_id_by_name(
        &self,
        name: models::types::RoleType,
    ) -> anyhow::Result<Option<i32>> {
        self.query_wrapper(move |conn| {
            schema::roles::table
                .filter(schema::roles::name.eq(name))
                .select(schema::roles::id)
                .first(conn)
                .optional()
        })
        .await
    }

    pub async fn get_permission_by_name(
        &self,
        name: models::types::PermissionType,
    ) -> anyhow::Result<Option<models::Permission>> {
        self.query_wrapper(move |conn| {
            schema::permissions::table
                .filter(schema::permissions::name.eq(name))
                .first(conn)
                .optional()
        })
        .await
    }

    pub async fn get_role_permission(
        &self,
        role_id: i32,
        permission_id: i32,
    ) -> anyhow::Result<Option<models::RolePermission>> {
        self.query_wrapper(move |conn| {
            schema::role_permissions::table
                .filter(
                    schema::role_permissions::role_id
                        .eq(role_id)
                        .and(schema::role_permissions::permission_id.eq(permission_id)),
                )
                .first(conn)
                .optional()
        })
        .await
    }

    pub async fn get_user_by_email(&self, email: String) -> anyhow::Result<Option<models::User>> {
        self.query_wrapper(move |conn| {
            schema::users::table
                .filter(schema::users::email.eq(email))
                .first(conn)
                .optional()
        })
        .await
    }

    pub async fn get_user_by_id(&self, id: i32) -> anyhow::Result<Option<models::User>> {
        self.query_wrapper(move |conn| schema::users::table.find(id).first(conn).optional())
            .await
    }

    pub async fn get_user_permissions(
        &self,
        user_id: i32,
    ) -> anyhow::Result<Vec<models::types::PermissionType>> {
        self.query_wrapper(move |conn| {
            schema::users::table
                .inner_join(schema::roles::table.inner_join(
                    schema::role_permissions::table.inner_join(schema::permissions::table),
                ))
                .filter(schema::users::id.eq(user_id))
                .select(schema::permissions::name)
                .load(conn)
        })
        .await
    }

    pub async fn create_therapist(&self, new_therapist: models::Therapist) -> anyhow::Result<i32> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::therapists::table)
                .values(&new_therapist)
                .returning(schema::therapists::id)
                .get_result(conn)
        })
        .await
    }

    pub async fn create_relative(&self, new_relative: models::Relative) -> anyhow::Result<i32> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::relatives::table)
                .values(&new_relative)
                .returning(schema::relatives::id)
                .get_result(conn)
        })
        .await
    }

    pub async fn get_relatives(&self) -> anyhow::Result<Vec<(i32, String)>> {
        self.query_wrapper(move |conn| {
            schema::relatives::table
                .inner_join(schema::users::table)
                .select((
                    schema::relatives::id,
                    schema::relatives::firstname
                        .concat(" ")
                        .concat(schema::relatives::lastname),
                ))
                .load(conn)
        })
        .await
    }

    pub async fn create_student(&self, new_student: models::Student) -> anyhow::Result<i32> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::students::table)
                .values(&new_student)
                .returning(schema::students::id)
                .get_result(conn)
        })
        .await
    }

    pub async fn has_permission(
        &self,
        user_id: i32,
        permission: models::types::PermissionType,
    ) -> anyhow::Result<bool> {
        self.query_wrapper(move |conn| {
            schema::users::table
                .inner_join(schema::roles::table.inner_join(
                    schema::role_permissions::table.inner_join(schema::permissions::table),
                ))
                .filter(schema::users::id.eq(user_id))
                .filter(schema::permissions::name.eq(permission))
                .select(diesel::dsl::count(schema::permissions::id))
                .get_result(conn)
                .map(|count: i64| count > 0)
        })
        .await
    }

    pub async fn has_permissions(
        &self,
        user_id: i32,
        permissions: Vec<models::types::PermissionType>,
    ) -> anyhow::Result<bool> {
        self.query_wrapper(move |conn| {
            let len = permissions.len() as i64;

            schema::users::table
                .inner_join(schema::roles::table.inner_join(
                    schema::role_permissions::table.inner_join(schema::permissions::table),
                ))
                .filter(schema::users::id.eq(user_id))
                .filter(schema::permissions::name.eq_any(permissions))
                .select(diesel::dsl::count(schema::permissions::id))
                .get_result(conn)
                .map(|count: i64| count == len)
        })
        .await
    }

    pub async fn get_therapists(&self) -> anyhow::Result<Vec<(models::User, models::Therapist)>> {
        self.query_wrapper(move |conn| {
            schema::users::table
                .inner_join(schema::therapists::table)
                .load(conn)
        })
        .await
    }

    pub async fn get_students(
        &self,
    ) -> anyhow::Result<Vec<(models::User, models::Student, String, String)>> {
        self.query_wrapper(move |conn| {
            schema::users::table
                .inner_join(schema::students::table.inner_join(schema::relatives::table))
                .select((
                    schema::users::all_columns,
                    schema::students::all_columns,
                    schema::relatives::firstname
                        .concat(" ")
                        .concat(schema::relatives::lastname),
                    schema::relatives::phone,
                ))
                .load(conn)
        })
        .await
    }

    pub async fn create_production_report(
        &self,
        new_production_report: models::ProductionReport,
    ) -> anyhow::Result<i32> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::production_reports::table)
                .values(&new_production_report)
                .returning(schema::production_reports::id)
                .get_result(conn)
        })
        .await
    }

    pub async fn create_report(&self, new_report: models::Report) -> anyhow::Result<i32> {
        self.query_wrapper(move |conn| {
            diesel::insert_into(schema::reports::table)
                .values(&new_report)
                .returning(schema::reports::id)
                .get_result(conn)
        })
        .await
    }

    pub async fn get_production_reports(
        &self,
    ) -> anyhow::Result<Vec<(models::Report, models::ProductionReport)>> {
        self.query_wrapper(move |conn| {
            schema::reports::table
                .inner_join(schema::production_reports::table)
                .load(conn)
        })
        .await
    }

    pub async fn get_students_names(&self) -> anyhow::Result<Vec<(i32, String)>> {
        self.query_wrapper(move |conn| {
            schema::students::table
                .inner_join(schema::users::table)
                .select((
                    schema::students::id,
                    schema::students::firstname
                        .concat(" ")
                        .concat(schema::students::lastname),
                ))
                .load(conn)
        })
        .await
    }
}
