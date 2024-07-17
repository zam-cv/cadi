use crate::{schema, models::*};
use serde::{Deserialize, Serialize};
use validator::Validate;
use diesel::prelude::*;

#[derive(Deserialize, Serialize, Validate, Debug)]
#[derive(Queryable, Selectable, Identifiable, Insertable, AsChangeset, Associations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(belongs_to(User), belongs_to(Relative))]
#[diesel(primary_key(id))]
#[diesel(table_name = schema::students)]
pub struct Student {
    #[serde(skip_deserializing)]
    #[diesel(deserialize_as = i32)]
    pub id: Option<i32>,
    pub user_id: i32,
    pub relative_id: i32,
    #[validate(length(min = 1, max = 50))]
    pub firstname: String,
    #[validate(length(min = 1, max = 50))]
    pub lastname: String,
    pub birthdate: chrono::NaiveDateTime,
}