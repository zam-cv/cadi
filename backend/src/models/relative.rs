use crate::{schema, models::*, utils::regex::PHONE_REGEX};
use serde::{Deserialize, Serialize};
use validator::Validate;
use diesel::prelude::*;

#[derive(Deserialize, Serialize, Validate, Debug)]
#[derive(Queryable, Selectable, Identifiable, Insertable, AsChangeset, Associations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(belongs_to(User))]
#[diesel(primary_key(id))]
#[diesel(table_name = schema::relatives)]
pub struct Relative {
    #[serde(skip_deserializing)]
    #[diesel(deserialize_as = i32)]
    pub id: Option<i32>,
    pub user_id: i32,
    #[validate(length(min = 1, max = 50))]
    pub firstname: String,
    #[validate(length(min = 1, max = 50))]
    pub lastname: String,
    #[validate(length(min = 1, max = 200))]
    pub location: String,
    #[validate(regex(path = *PHONE_REGEX))]
    pub phone: String,
}