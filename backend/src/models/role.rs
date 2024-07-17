use crate::{schema, models::types};
use serde::{Deserialize, Serialize};
use diesel::prelude::*;

#[derive(Deserialize, Serialize, Debug)]
#[derive(Queryable, Selectable, Identifiable, Insertable, AsChangeset)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(primary_key(id))]
#[diesel(table_name = schema::roles)]
pub struct Role {
    #[serde(skip_deserializing)]
    #[diesel(deserialize_as = i32)]
    pub id: Option<i32>,
    pub name: types::RoleType,
}