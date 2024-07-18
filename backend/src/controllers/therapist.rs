use crate::{
    database::{Database, DbResponder},
    models::{self, types},
};
use actix_web::{post, web, HttpResponse, Responder, Result};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Therapist {
    pub user: models::User,
    pub therapist: models::Therapist,
}

#[post("/create")]
async fn create(
    therapist: web::Json<Therapist>,
    database: web::Data<Database>,
) -> Result<impl Responder> {
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

pub fn routes() -> actix_web::Scope {
    web::scope("/therapist").service(create)
}
