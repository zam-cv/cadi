use crate::schema;
use serde::{Deserialize, Serialize};
use validator::Validate;
use diesel::prelude::*;

#[derive(Deserialize, Serialize, Validate, Debug)]
#[derive(Queryable, Selectable, Identifiable, Insertable, AsChangeset)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(primary_key(id))]
#[diesel(table_name = schema::reports)]
pub struct Report {
    #[serde(skip_deserializing)]
    #[diesel(deserialize_as = i32)]
    pub id: Option<i32>,
    #[validate(length(min = 1, max = 80))]
    pub title: String,
    #[validate(length(min = 0, max = 500))]
    pub description: String,
    #[serde(skip_deserializing)]
    pub created_at: chrono::NaiveDateTime,
}