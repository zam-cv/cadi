-- Your SQL goes here
BEGIN;
CREATE TYPE ROLE_TYPE AS ENUM ('admin', 'therapist', 'student', 'relative');
CREATE TYPE PERMISSION_TYPE AS ENUM ('see_dashboard', 'enroll_students', 'enroll_therapists', 'enroll_relatives', 'see_calculator', 'see_production_reports', 'see_reports', 'see_students', 'see_therapists', 'make_production_reports', 'make_reports', 'see_reports_as_relative');
CREATE TYPE AREA_TYPE AS ENUM ('academic', 'social', 'emotional', 'physical', 'cognitive', 'language', 'sensory', 'behavioral', 'play', 'work', 'leisure', 'social_skills', 'communication', 'mobility', 'independence', 'safety', 'nutrition', 'hygiene', 'sleep', 'toileting', 'grooming', 'feeding', 'drinking', 'eating');

CREATE TABLE "roles"(
	"id" SERIAL PRIMARY KEY,
	"name" ROLE_TYPE NOT NULL
);

CREATE TABLE "users"(
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(255) NOT NULL,
	"password" VARCHAR(150) NOT NULL,
	"role_id" INT4 NOT NULL,
	FOREIGN KEY ("role_id") REFERENCES "roles"("id")
);

CREATE TABLE "permissions"(
	"id" SERIAL PRIMARY KEY,
	"name" PERMISSION_TYPE NOT NULL
);

CREATE TABLE "role_permissions"(
	"id" SERIAL PRIMARY KEY,
	"role_id" INT4 NOT NULL,
	"permission_id" INT4 NOT NULL,
	FOREIGN KEY ("role_id") REFERENCES "roles"("id"),
	FOREIGN KEY ("permission_id") REFERENCES "permissions"("id")
);

CREATE TABLE "documents"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT4 NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE TABLE "therapists"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT4 NOT NULL,
	"firstname" VARCHAR(50) NOT NULL,
	"lastname" VARCHAR(50) NOT NULL,
	"birthdate" TIMESTAMP NOT NULL,
	"phone" VARCHAR(20) NOT NULL,
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE TABLE "relatives"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT4 NOT NULL,
	"firstname" VARCHAR(50) NOT NULL,
	"lastname" VARCHAR(50) NOT NULL,
	"location" VARCHAR(200) NOT NULL,
	"phone" VARCHAR(20) NOT NULL,
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE TABLE "students"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT4 NOT NULL,
	"relative_id" INT4 NOT NULL,
	"firstname" VARCHAR(50) NOT NULL,
	"lastname" VARCHAR(50) NOT NULL,
	"birthdate" TIMESTAMP NOT NULL,
	FOREIGN KEY ("user_id") REFERENCES "users"("id"),
	FOREIGN KEY ("relative_id") REFERENCES "relatives"("id")
);

CREATE TABLE "reports"(
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(80) NOT NULL,
	"description" VARCHAR(500) NOT NULL,
	"created_at" TIMESTAMP NOT NULL
);

CREATE TABLE "production_reports"(
	"id" SERIAL PRIMARY KEY,
	"report_id" INT4 NOT NULL,
	"quantity" INT4 NOT NULL,
	FOREIGN KEY ("report_id") REFERENCES "reports"("id")
);

CREATE TABLE "student_reports"(
	"id" SERIAL PRIMARY KEY,
	"report_id" INT4 NOT NULL,
	"student_id" INT4 NOT NULL,
	"therapist_id" INT4 NOT NULL,
	"area" AREA_TYPE NOT NULL,
	"consequence" VARCHAR(500) NOT NULL,
	FOREIGN KEY ("report_id") REFERENCES "reports"("id"),
	FOREIGN KEY ("student_id") REFERENCES "students"("id"),
	FOREIGN KEY ("therapist_id") REFERENCES "therapists"("id")
);

CREATE TABLE "evidences"(
	"id" SERIAL PRIMARY KEY,
	"student_report_id" INT4 NOT NULL,
	"image" VARCHAR(500) NOT NULL,
	FOREIGN KEY ("student_report_id") REFERENCES "student_reports"("id")
);

COMMIT;