use crate::{schema, models::*, utils};
use serde::{Deserialize, Serialize};
use validator::Validate;
use diesel::prelude::*;

#[derive(Deserialize, Serialize, Validate, Debug)]
#[derive(Queryable, Selectable, Identifiable, Insertable, AsChangeset, Associations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(primary_key(id))]
#[diesel(belongs_to(Role))]
#[diesel(table_name = schema::users)]
pub struct User {
    #[serde(skip_deserializing)]
    #[diesel(deserialize_as = i32)]
    pub id: Option<i32>,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 8))]
    #[serde(skip_serializing)]
    pub password: String,
    #[serde(skip_deserializing, skip_serializing)]
    pub role_id: i32,
}

impl User {
    pub fn hash_password(&mut self) -> anyhow::Result<()> {
        match utils::hash_password(&self.password.clone()) {
            Ok(hash) => {
                self.password = hash;
                Ok(())
            }
            Err(_) => {
                log::error!("Failed to hash password");
                anyhow::bail!("Failed to hash password")
            }
        }
    }
}