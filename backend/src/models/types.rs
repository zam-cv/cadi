use serde::{Deserialize, Serialize};
use diesel_derive_enum::DbEnum;
use strum_macros::{EnumIter, EnumString, Display};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[derive(DbEnum, Serialize, Deserialize, EnumIter, EnumString, Display)]
pub enum PermissionType {
    #[serde(alias = "see_dashboard", rename = "see_dashboard")]
    SeeDashboard,
    #[serde(alias = "enroll_students", rename = "enroll_students")]
    EnrollStudents,
    #[serde(alias = "enroll_therapists", rename = "enroll_therapists")]
    EnrollTherapists,
    #[serde(alias = "see_calculator", rename = "see_calculator")]
    SeeCalculator,
    #[serde(alias = "see_production_reports", rename = "see_production_reports")]
    SeeProductionReports,
    #[serde(alias = "see_reports", rename = "see_reports")]
    SeeReports,
    #[serde(alias = "see_students", rename = "see_students")]
    SeeStudents,
    #[serde(alias = "see_therapists", rename = "see_therapists")]
    SeeTherapists,
    #[serde(alias = "make_production_reports", rename = "make_production_reports")]
    MakeProductionReports,
    #[serde(alias = "make_reports", rename = "make_reports")]
    MakeReports,
    #[serde(alias = "see_reports_as_relative", rename = "see_reports_as_relative")]
    SeeReportsAsRelative,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[derive(DbEnum, Serialize, Deserialize, EnumIter, EnumString, Display)]
pub enum RoleType {
    #[serde(alias = "admin", rename = "admin")]
    Admin,
    #[serde(alias = "therapist", rename = "therapist")]
    Therapist,
    #[serde(alias = "student", rename = "student")]
    Student,
    #[serde(alias = "relative", rename = "relative")]
    Relative,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[derive(DbEnum, Serialize, Deserialize, EnumIter, EnumString, Display)]
pub enum AreaType {
    #[serde(alias = "academic", rename = "academic")]
    Academic,
    #[serde(alias = "social", rename = "social")]
    Social,
    #[serde(alias = "emotional", rename = "emotional")]
    Emotional,
    #[serde(alias = "physical", rename = "physical")]
    Physical,
    #[serde(alias = "cognitive", rename = "cognitive")]
    Cognitive,
    #[serde(alias = "language", rename = "language")]
    Language,
    #[serde(alias = "sensory", rename = "sensory")]
    Sensory,
    #[serde(alias = "behavioral", rename = "behavioral")]
    Behavioral,
    #[serde(alias = "play", rename = "play")]
    Play,
    #[serde(alias = "work", rename = "work")]
    Work,
    #[serde(alias = "leisure", rename = "leisure")]
    Leisure,
    #[serde(alias = "social_skills", rename = "social_skills")]
    SocialSkills,
    #[serde(alias = "communication", rename = "communication")]
    Communication,
    #[serde(alias = "mobility", rename = "mobility")]
    Mobility,
    #[serde(alias = "independence", rename = "independence")]
    Independence,
    #[serde(alias = "safety", rename = "safety")]
    Safety,
    #[serde(alias = "nutrition", rename = "nutrition")]
    Nutrition,
    #[serde(alias = "hygiene", rename = "hygiene")]
    Hygiene,
    #[serde(alias = "sleep", rename = "sleep")]
    Sleep,
    #[serde(alias = "toileting", rename = "toileting")]
    Toileting,
    #[serde(alias = "grooming", rename = "grooming")]
    Grooming,
    #[serde(alias = "feeding", rename = "feeding")]
    Feeding,
    #[serde(alias = "drinking", rename = "drinking")]
    Drinking,
    #[serde(alias = "eating", rename = "eating")]
    Eating,
}

pub(crate) mod exports {
  pub use super::PermissionTypeMapping as PermissionType;
  pub use super::RoleTypeMapping as RoleType;
  pub use super::AreaTypeMapping as AreaType;
}