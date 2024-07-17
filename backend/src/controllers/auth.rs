use crate::{config, database::Database, utils, middlewares, models::types};
use actix_web::{get, post, web, HttpMessage, HttpRequest, HttpResponse};
use serde::{Deserialize, Serialize};
use actix_web_lab::middleware::from_fn;

#[derive(Deserialize, Serialize)]
pub struct Credentials {
    pub email: String,
    pub password: String,
}

#[derive(Deserialize, Serialize)]
pub struct UserInformation {
    pub email: String,
    pub permissions: Vec<types::PermissionType>,
}

#[derive(Deserialize, Serialize)]
pub struct Session {
    pub token: String,
    pub user_information: UserInformation,
}

#[post("/signin")]
async fn signin(
    credentials: web::Json<Credentials>,
    database: web::Data<Database>,
) -> HttpResponse {
    // Get the user by email
    let mut user = match database.get_user_by_email(credentials.email.clone()).await {
        Ok(Some(user)) => user,
        _ => return HttpResponse::BadRequest().body("Invalid credentials"),
    };

    // Verify the password
    if let Ok(true) = utils::verify_password(&credentials.password, &user.password) {
        if let Some(id) = user.id {
            // Create a token
            if let Ok(token) = utils::create_token(&config::SECRET_KEY, id) {
                let cookie = format!("Bearer {}", token);
                let cookie = utils::get_cookie_with_token(&cookie, config::COOKIE_NAME);

                // get user permissions
                let permissions = database.get_user_permissions(id).await.unwrap_or_default();

                return HttpResponse::Ok().cookie(cookie).json(Session {
                    token,
                    user_information: UserInformation {
                        email: std::mem::take(&mut user.email),
                        permissions,
                    },
                });
            }
        }
    };

    log::error!("Invalid credentials");
    HttpResponse::BadRequest().body("Invalid credentials")
}

#[get("/verify")]
async fn verify(req: HttpRequest, database: web::Data<Database>) -> HttpResponse {
    if let Some(id) = req.extensions().get::<i32>() {
        // Get the user by id
        if let Ok(Some(mut user)) = database.get_user_by_id(*id).await {
            // get user permissions
            let permissions = database.get_user_permissions(*id).await.unwrap_or_default();

            return HttpResponse::Ok().json(UserInformation {
                email: std::mem::take(&mut user.email),
                permissions,
            });
        }
    }

    HttpResponse::Unauthorized().finish()
}

#[post("/logout")]
async fn logout() -> HttpResponse {
    let cookie = utils::get_cookie_with_expired_token(config::COOKIE_NAME);
    HttpResponse::Ok().cookie(cookie).finish()
}

pub fn routes() -> actix_web::Scope {
    web::scope("/auth")
        .service(signin)
        .service(logout)
        .service(
            web::scope("")
                .wrap(from_fn(middlewares::user_middleware))
                .service(verify),
        )
}