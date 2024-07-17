use crate::{schema, models::*};
use serde::{Deserialize, Serialize};
use diesel::prelude::*;

#[derive(Deserialize, Serialize, Debug)]
#[derive(Queryable, Selectable, Identifiable, Insertable, AsChangeset, Associations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(primary_key(id))]
#[diesel(belongs_to(Role), belongs_to(Permission))]
#[diesel(table_name = schema::role_permissions)]
pub struct RolePermission {
    #[serde(skip_deserializing)]
    #[diesel(deserialize_as = i32)]
    pub id: Option<i32>,
    pub role_id: i32,
    pub permission_id: i32,
}