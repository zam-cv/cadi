use dotenv::dotenv;
use log::info;

mod app;
mod config;
mod controllers;
mod database;
mod models;
mod schema;
mod utils;
mod middlewares;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load the environment variables
    dotenv().ok();

    // Initialize the logger
    env_logger::init();

    // Start the application
    app::app().await
}
