use crate::{schema, models::*};
use serde::{Deserialize, Serialize};
use validator::Validate;
use diesel::prelude::*;

#[derive(Deserialize, Serialize, Validate, Debug)]
#[derive(Queryable, Selectable, Identifiable, Insertable, AsChangeset, Associations)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[diesel(primary_key(id))]
#[diesel(belongs_to(Report), belongs_to(Student), belongs_to(Therapist))]
#[diesel(table_name = schema::student_reports)]
pub struct StudentReport {
    #[serde(skip_deserializing)]
    #[diesel(deserialize_as = i32)]
    pub id: Option<i32>,
    #[serde(skip_deserializing, skip_serializing)]
    pub report_id: i32,
    pub student_id: i32,
    pub therapist_id: i32,
    pub area: types::AreaType,
    #[validate(length(min = 0, max = 500))]
    pub consequence: String
}