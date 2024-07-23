// @generated automatically by Diesel CLI.

diesel::table! {
    use diesel::sql_types::*;
    use crate::models::types::exports::*;

    roles (id) {
        id -> Int4,
        name -> RoleType
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 150]
        password -> Varchar,
        role_id -> Int4,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use crate::models::types::exports::*;

    permissions (id) {
        id -> Int4,
        name -> PermissionType
    }
}

diesel::table! {
    role_permissions (id) {
        id -> Int4,
        role_id -> Int4,
        permission_id -> Int4,
    }
}

diesel::table! {
    documents (id) {
        id -> Int4,
        user_id -> Int4,
        #[max_length = 255]
        name -> Varchar,
        created_at -> Timestamp,
    }
}

diesel::table! {
    therapists (id) {
        id -> Int4,
        user_id -> Int4,
        #[max_length = 50]
        firstname -> Varchar,
        #[max_length = 50]
        lastname -> Varchar,
        birthdate -> Timestamp,
        #[max_length = 20]
        phone -> Varchar,
    }
}

diesel::table! {
    relatives (id) {
        id -> Int4,
        user_id -> Int4,
        #[max_length = 50]
        firstname -> Varchar,
        #[max_length = 50]
        lastname -> Varchar,
        #[max_length = 200]
        location -> Varchar,
        #[max_length = 20]
        phone -> Varchar,
    }
}

diesel::table! {
    students (id) {
        id -> Int4,
        user_id -> Int4,
        relative_id -> Int4,
        #[max_length = 50]
        firstname -> Varchar,
        #[max_length = 50]
        lastname -> Varchar,
        birthdate -> Timestamp,
    }
}

diesel::table! {
    reports (id) {
        id -> Int4,
        #[max_length = 80]
        title -> Varchar,
        #[max_length = 500]
        description -> Varchar,
        created_at -> Timestamp,
    }
}

diesel::table! {
    production_reports (id) {
        id -> Int4,
        report_id -> Int4,
        quantity -> Int4,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use crate::models::types::exports::*;

    student_reports (id) {
        id -> Int4,
        report_id -> Int4,
        student_id -> Int4,
        therapist_id -> Int4,
        area -> AreaType,
        #[max_length = 500]
        consequence -> Varchar,
    }
}

diesel::table! {
    evidences (id) {
        id -> Int4,
        student_report_id -> Int4,
        #[max_length = 500]
        image -> Varchar
    }
}

diesel::joinable!(users -> roles (role_id));
diesel::joinable!(role_permissions -> roles (role_id));
diesel::joinable!(role_permissions -> permissions (permission_id));
diesel::joinable!(documents -> users (user_id));
diesel::joinable!(therapists -> users (user_id));
diesel::joinable!(students -> users (user_id));
diesel::joinable!(students -> relatives (relative_id));
diesel::joinable!(relatives -> users (user_id));
diesel::joinable!(production_reports -> reports (report_id));
diesel::joinable!(student_reports -> reports (report_id));
diesel::joinable!(student_reports -> students (student_id));
diesel::joinable!(student_reports -> therapists (therapist_id));
diesel::joinable!(evidences -> student_reports (student_report_id));

diesel::allow_tables_to_appear_in_same_query!(
    roles,
    users,
    permissions,
    role_permissions,
    documents,
    therapists,
    students,
    relatives,
    reports,
    production_reports,
    student_reports,
    evidences,
);