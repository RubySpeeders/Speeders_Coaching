
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

CREATE TABLE "status" (
	"id" SERIAL PRIMARY KEY,
	"status" VARCHAR (10)
	);

INSERT INTO "status" (status) VALUES ('PENDING'), ('COMPLETED'), ('CANCELLED');

CREATE TABLE "athlete_info" (
    "id" SERIAL PRIMARY KEY,
    "athlete_id" INT REFERENCES "user",
    "coach_id" INT REFERENCES "user",
    "rest_day" INT REFERENCES "days_of_week",
    "long_run_day" INT REFERENCES "days_of_week",
    "speed_work" BOOLEAN NOT NULL,
    "run_history" VARCHAR (80) NOT NULL,
    "avg_weekly_mileage" VARCHAR (80) NOT NULL,
    "injury" BOOLEAN NOT NULL,
    "injury_description" VARCHAR (1000) NOT NULL,
    "medication" BOOLEAN NOT NULL,
    "medication_description" VARCHAR (1000) NOT NULL,
    "health_risk_comments" VARCHAR (1000) NOT NULL,
    "life_outside_running" VARCHAR (1000) NOT NULL,
    "general_comments" VARCHAR (1000) NOT NULL
);

CREATE TABLE "invite" (
	"id" SERIAL PRIMARY KEY,
	"coach_id" INT REFERENCES "user",
	"athlete_id" INT REFERENCES "user",
	"status" INT REFERENCES "status",
	"temporary_key" integer
	);

CREATE TABLE "other_exercise" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (80)
	);

INSERT INTO "other_exercise" (description) VALUES ('Yoga'), ('Barre'), ('Cycling'), ('Crossfit'), ('Weight Lifting'), ('Dance'), ('HIIT'), ('Pilates');

CREATE TABLE "race_types" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (80)
	);

INSERT INTO "race_types" (description) VALUES ('5K'), ('10K'),  ('half marathon'),  ('marathon'),  ('50K'),  ('100K'), ('100 mile');

CREATE TABLE "messages" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"message" VARCHAR (1000),
	"time_posted" TIMESTAMP
	);

SET timezone = 'America/Chicago';

CREATE TABLE "tips_and_tricks" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"title" VARCHAR (1000),
	"article_link" VARCHAR (1000),
	"video_link" VARCHAR (1000),
	"comments" VARCHAR,
	"time_posted" TIMESTAMP
	);