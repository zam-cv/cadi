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
pub struct StudentReport {
  pub report: models::Report,
  pub student_report: models::StudentReport,
}


#[get("/all")]
async fn get_all(database: web::Data<Database>) -> Result<impl Responder> {
  let reports = database.get_student_reports().await.to_web()?;
  Ok(HttpResponse::Ok().json(reports))
}

#[get("/count")]
async fn count(database: web::Data<Database>) -> Result<impl Responder> {
  let count = database.count_student_reports().await.to_web()?;
  Ok(HttpResponse::Ok().json(count))
}

// #[get("/count-area")]
// async fn countArea(database: web::Data<Database>) -> Result<impl Responder> {
//   let count = database.count_student_reports_by_area().await.to_web()?;
//   Ok(HttpResponse::Ok().json(count))
// }

pub fn routes() -> actix_web::Scope {
  web::scope("/student-report")
      .service(
          web::scope("see")
              .wrap(from_fn(|req, srv| {
                  middlewares::permission_middleware(
                      req,
                      srv,
                      types::PermissionType::SeeProductionReports,
                  )
              }))
              .service(get_all)
              .service(count),
              // .service(countArea),
      )
}
