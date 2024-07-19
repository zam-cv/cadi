use crate::{
    database::{Database, DbResponder},
    middlewares,
    models::{self, types},
};
use actix_web::{get, post, web, HttpResponse, Responder, Result};
use actix_web_lab::middleware::from_fn;
use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Deserialize, Serialize)]
pub struct Relative {
    pub user: models::User,
    pub relative: models::Relative,
}

#[post("/create")]
async fn create(
    relative: web::Json<Relative>,
    database: web::Data<Database>,
) -> Result<impl Responder> {
    if let Err(_) = relative.user.validate() {
        return Ok(HttpResponse::BadRequest());
    }

    if let Err(_) = relative.relative.validate() {
        return Ok(HttpResponse::BadRequest());
    }

    let mut relative = relative.into_inner();
    let role_id = database
        .get_role_id_by_name(types::RoleType::Relative)
        .await
        .to_web()?;

    match role_id {
        Some(role_id) => {
            relative.relative.firstname = relative.relative.firstname.to_lowercase();
            relative.relative.lastname = relative.relative.lastname.to_lowercase();
            relative.user.role_id = role_id;

            let id = database.create_user(relative.user).await.to_web()?;
            relative.relative.user_id = id;
            database.create_relative(relative.relative).await.to_web()?;

            Ok(HttpResponse::Ok())
        }
        None => Ok(HttpResponse::InternalServerError()),
    }
}

#[get("/names")]
async fn get_names(database: web::Data<Database>) -> Result<impl Responder> {
    let relatives = database.get_relatives().await.to_web()?;
    Ok(HttpResponse::Ok().json(relatives))
}

pub fn routes() -> actix_web::Scope {
    web::scope("/relative")
        .service(
            web::scope("enroll")
                .wrap(from_fn(|req, srv| {
                    middlewares::permission_middleware(
                        req,
                        srv,
                        types::PermissionType::EnrollRelatives,
                    )
                }))
                .service(create)
                .service(get_names),
        )
}
