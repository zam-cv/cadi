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
pub struct Therapist {
    pub user: models::User,
    pub therapist: models::Therapist,
}

#[post("/create")]
async fn create(
    mut therapist: web::Json<Therapist>,
    database: web::Data<Database>,
) -> Result<impl Responder> {
    if let Err(_) = therapist.user.validate() {
        return Ok(HttpResponse::BadRequest());
    }

    if let Err(_) = therapist.user.hash_password() {
        return Ok(HttpResponse::BadRequest());
    }

    if let Err(_) = therapist.therapist.validate() {
        return Ok(HttpResponse::BadRequest());
    }

    let mut therapist = therapist.into_inner();
    let role_id = database
        .get_role_id_by_name(types::RoleType::Therapist)
        .await
        .to_web()?;

    match role_id {
        Some(role_id) => {
            therapist.therapist.firstname = therapist.therapist.firstname.to_lowercase();
            therapist.therapist.lastname = therapist.therapist.lastname.to_lowercase();
            therapist.user.role_id = role_id;

            let id = database.create_user(therapist.user).await.to_web()?;
            therapist.therapist.user_id = id;
            database
                .create_therapist(therapist.therapist)
                .await
                .to_web()?;

            Ok(HttpResponse::Ok())
        }
        None => Ok(HttpResponse::InternalServerError()),
    }
}

#[get("/all")]
async fn get_all(database: web::Data<Database>) -> Result<impl Responder> {
    let therapists = database.get_therapists().await.to_web()?;
    Ok(HttpResponse::Ok().json(therapists))
}

// #[get("/count")]
// async fn count(database: web::Data<Database>) -> Result<impl Responder> {
//     let count = database.count_therapists().await.to_web()?;
//     Ok(HttpResponse::Ok().json(count))
// }
#[get("/count")]
async fn count(database: web::Data<Database>) -> Result<impl Responder, actix_web::Error> {
    match database.count_therapists().await {
        Ok(count) => Ok(HttpResponse::Ok().json(count)),
        Err(err) => {
            eprintln!("Error counting therapists: {:?}", err);
            Ok(HttpResponse::InternalServerError().json("Internal Server Error"))
        }
    }
}


pub fn routes() -> actix_web::Scope {
    web::scope("/therapist")
        .service(
            web::scope("enroll")
                .wrap(from_fn(|req, srv| {
                    middlewares::permission_middleware(
                        req,
                        srv,
                        types::PermissionType::EnrollTherapists,
                    )
                }))
                .service(create),
        )
        .service(
            web::scope("see")
                .wrap(from_fn(|req, srv| {
                    middlewares::permission_middleware(
                        req,
                        srv,
                        types::PermissionType::SeeTherapists,
                    )
                }))
                .service(get_all)
                .service(count),
        )
        // .service(
        //     web::scope("counts")
        //         .wrap(from_fn(|req, srv| {
        //             middlewares::permission_middleware(
        //                 req,
        //                 srv,
        //                 types::PermissionType::SeeTherapists,
        //             )
        //         }))
        //         .service(count),
        // )
}
