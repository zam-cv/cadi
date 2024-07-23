use crate::{
    database::{Database, DbResponder},
    middlewares,
    models::{self, types},
};
use actix_web::{get, post, web, HttpResponse, Responder, Result};
use actix_web_lab::middleware::from_fn;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use strum::IntoEnumIterator;
use validator::Validate;

lazy_static! {
    pub static ref AREAS: Vec<types::AreaType> = types::AreaType::iter().collect();
}

#[derive(Deserialize, Serialize)]
pub struct Student {
    pub user: models::User,
    pub student: models::Student,
}

#[post("/create")]
async fn create(
    mut student: web::Json<Student>,
    database: web::Data<Database>,
) -> Result<impl Responder> {
    if let Err(_) = student.user.validate() {
        return Ok(HttpResponse::BadRequest());
    }

    if let Err(_) = student.user.hash_password() {
        return Ok(HttpResponse::BadRequest());
    }

    if let Err(_) = student.student.validate() {
        return Ok(HttpResponse::BadRequest());
    }

    let mut student = student.into_inner();
    let role_id = database
        .get_role_id_by_name(types::RoleType::Student)
        .await
        .to_web()?;

    match role_id {
        Some(role_id) => {
            student.student.firstname = student.student.firstname.to_lowercase();
            student.student.lastname = student.student.lastname.to_lowercase();
            student.user.role_id = role_id;

            let id = database.create_user(student.user).await.to_web()?;
            student.student.user_id = id;
            database.create_student(student.student).await.to_web()?;

            Ok(HttpResponse::Ok())
        }
        None => Ok(HttpResponse::InternalServerError()),
    }
}

#[get("/all")]
async fn get_all(database: web::Data<Database>) -> Result<impl Responder> {
    let students = database.get_students().await.to_web()?;
    Ok(HttpResponse::Ok().json(students))
}

#[get("/areas")]
async fn get_areas() -> Result<impl Responder> {
    Ok(HttpResponse::Ok().json(&*AREAS))
}

#[get("/names")]
async fn get_names(database: web::Data<Database>) -> Result<impl Responder> {
    let students = database.get_students_names().await.to_web()?;
    Ok(HttpResponse::Ok().json(students))
}

pub fn routes() -> actix_web::Scope {
    web::scope("/student")
        .service(
            web::scope("enroll")
                .wrap(from_fn(|req, srv| {
                    middlewares::permission_middleware(
                        req,
                        srv,
                        types::PermissionType::EnrollStudents,
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
                .service(get_all),
        )
        .service(
            web::scope("create-report")
                .wrap(from_fn(|req, srv| {
                    middlewares::permission_middleware(
                        req,
                        srv,
                        types::PermissionType::MakeReports,
                    )
                }))
                .service(get_areas)
                .service(get_names),
        )
}
