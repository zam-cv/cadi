use crate::{schema, models::*};
use serde::{Deserialize, Serialize};
use diesel::prelude::*;
use validator::Validate;

#[derive(Deserialize, Serialize, Debug, Validate)]
#[derive(Queryable, Selectable, Identifiable, Insertable, AsChangeset, Associations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(primary_key(id))]
#[diesel(belongs_to(StudentReport))]
#[diesel(table_name = schema::evidences)]
pub struct Evidence {
    #[serde(skip_deserializing)]
    #[diesel(deserialize_as = i32)]
    pub id: Option<i32>,
    pub student_report_id: i32,
    #[validate(length(min = 1, max = 500))]
    pub image: String,
}