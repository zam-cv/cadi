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
pub struct ProductionReport {
  pub report: models::Report,
  pub production_report: models::ProductionReport,
}

#[post("/create")]
async fn create(
  report: web::Json<ProductionReport>,
  database: web::Data<Database>,
) -> Result<impl Responder> {
  if let Err(_) = report.report.validate() {
      return Ok(HttpResponse::BadRequest());
  }

  let mut report = report.into_inner();
  report.report.created_at = chrono::Local::now().naive_local();
  let report_id = database.create_report(report.report).await.to_web()?;
  report.production_report.report_id = report_id;
  database.create_production_report(report.production_report).await.to_web()?;
  Ok(HttpResponse::Ok())
}

#[get("/all")]
async fn get_all(database: web::Data<Database>) -> Result<impl Responder> {
  let reports = database.get_production_reports().await.to_web()?;
  Ok(HttpResponse::Ok().json(reports))
}

pub fn routes() -> actix_web::Scope {
  web::scope("/production-report")
      .service(
          web::scope("make")
              .wrap(from_fn(|req, srv| {
                  middlewares::permission_middleware(
                      req,
                      srv,
                      types::PermissionType::MakeProductionReports,
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
                      types::PermissionType::SeeProductionReports,
                  )
              }))
              .service(get_all),
      )
}
