
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (80) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "city" VARCHAR (80) NOT NULL,
    "email" VARCHAR (80) NOT NULL,
    "DOB" DATE NOT NULL,
    "gender" VARCHAR (40) NOT NULL,
    "role_id" INT REFERENCES "roles",
    "strava_id" VARCHAR (80)
);

CREATE TABLE "roles" (
	"id" SERIAL PRIMARY KEY,
	"role" VARCHAR,
	"access_level" int
	);

INSERT INTO "roles" (role, access_level) VALUES ('coach', 1), ('athlete', 0);

CREATE TABLE "days_of_week" (
	"id" SERIAL PRIMARY KEY,
	"day" VARCHAR (20) NOT NULL
	);

INSERT INTO "days_of_week" (day) VALUES ('Sunday'), ('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday'), ('Saturday');