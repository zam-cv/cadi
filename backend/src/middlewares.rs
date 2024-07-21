use crate::{config, utils, database::Database, models};
use actix_web::{
    web,
    body::MessageBody,
    dev::{ServiceRequest, ServiceResponse},
    Error, HttpMessage, HttpResponse,
};
use actix_web_lab::middleware::Next;

// support for websockets
fn support_websockets(req: &ServiceRequest) -> Option<String> {
    req.headers()
        .get(actix_web::http::header::SEC_WEBSOCKET_PROTOCOL)
        .and_then(|header| {
            header
                .to_str()
                .map(|s| {
                    let parts: Vec<&str> = s.split(", ").collect();

                    if parts.len() == 2 {
                        let token = parts[1];
                        req.extensions_mut().insert(token.to_string());
                        return Some(token.to_string());
                    }

                    None
                })
                .ok()
                .flatten()
        })
}

pub async fn middleware(
    req: ServiceRequest,
    next: Next<impl MessageBody + 'static>,
    secret_key: &String,
    cookie_name: &'static str,
) -> Result<ServiceResponse<impl MessageBody>, Error> {
    let token = match req.cookie(cookie_name) {
        // supoort for cookies
        Some(cookie) => Some(cookie.value().to_string()),
        None => match req.headers().get(config::HEADER_NAME) {
            // support for headers
            Some(header) => header.to_str().map(|s| s.to_string()).ok(),
            // support for websockets
            None => support_websockets(&req),
        },
    };

    if let Some(token) = token {
        // Check if the token is valid
        let token = token.replace("Bearer ", "");
        if let Ok(claims) = utils::decode_token(secret_key, &token) {
            if claims.exp < chrono::Utc::now().timestamp() as usize {
                log::error!("Expired token");
                let cookie = utils::get_cookie_with_expired_token(cookie_name);
                let response = HttpResponse::Unauthorized().cookie(cookie).finish();
                return Ok(req.into_response(response).map_into_right_body());
            }

            // Insert the user id into the request extensions
            req.extensions_mut().insert(claims.id);
            return Ok(next.call(req).await?.map_into_left_body());
        }
    }

    log::error!("Unauthorized");
    let response = HttpResponse::Unauthorized().finish();
    Ok(req.into_response(response).map_into_right_body())
}

pub async fn user_middleware(
    req: ServiceRequest,
    next: Next<impl MessageBody + 'static>,
) -> Result<ServiceResponse<impl MessageBody>, Error> {
    middleware(req, next, &config::SECRET_KEY, config::HEADER_NAME).await
}

pub async fn permission_middleware(
    req: ServiceRequest,
    next: Next<impl MessageBody + 'static>,
    permission: models::types::PermissionType,
) -> Result<ServiceResponse<impl MessageBody>, Error> {
    let user_id = req.extensions().get::<i32>().cloned();

    if let Some(database) = req.app_data::<web::Data<Database>>() {
        if let Some(user_id) = user_id {
            if let Ok(true) = database.has_permission(user_id, permission).await {
                return Ok(next.call(req).await?.map_into_left_body());
            }
        }
    }

    let response = HttpResponse::Unauthorized().finish();
    Ok(req.into_response(response).map_into_right_body())
}

#[allow(dead_code)]
pub async fn permissions_middleware(
    req: ServiceRequest,
    next: Next<impl MessageBody + 'static>,
    permissions: Vec<models::types::PermissionType>,
) -> Result<ServiceResponse<impl MessageBody>, Error> {
    let user_id = req.extensions().get::<i32>().cloned();

    if let Some(database) = req.app_data::<web::Data<Database>>() {
        if let Some(user_id) = user_id {
            if let Ok(true) = database.has_permissions(user_id, permissions).await {
                return Ok(next.call(req).await?.map_into_left_body());
            }
        }
    }

    let response = HttpResponse::Unauthorized().finish();
    Ok(req.into_response(response).map_into_right_body())
}