use crate::{config, controllers, database::Database};
use actix_cors::Cors;
use actix_web::{middleware::Logger, web, App, HttpServer};
// use actix_web_lab::middleware::from_fn;
use std::env;

pub async fn app() -> std::io::Result<()> {
    // Create Database instance
    let database = Database::new();
    log::info!("Database connection established");

    // Setup the database
    config::database_setup(&database).await;

    // Get the HOST and PORT environment variables
    let host = env::var("HOST").unwrap_or("0.0.0.0".to_string());
    let port = env::var("PORT").unwrap_or("8080".to_string());

    // Start the HTTP server
    log::info!("Starting the server");
    log::info!("Listening on http://{}:{}", host, port);

    HttpServer::new(move || {
        App::new()
            // Enable logger and CORS middleware
            .wrap(Cors::permissive().supports_credentials())
            .wrap(Logger::default())
            // Pass the database instance to the application
            .app_data(web::Data::new(database.clone()))
            // Mount the API routes
            .service(
                web::scope("/api")
                    .service(controllers::auth::routes())
            )
    })
    .bind(format!("{}:{}", host, port))?
    .run()
    .await
}
