
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

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

CREATE TABLE "tips_type" (
	"id" SERIAL PRIMARY KEY,
	"type" varchar
	);
	
INSERT INTO "tips_type" (type) VALUES ('pre-run'), ('post-run'), ('strides'), ('stretching'), ('fueling');

CREATE TABLE "workout_steps" (
	"id" SERIAL PRIMARY KEY,
	"step" VARCHAR NOT NULL
);

INSERT INTO "workout_steps" (step) VALUES ('Warm up'), ('Interval'), ('Recovery'), ('Cool down');

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE,
    "password" VARCHAR (1000),
    "first_name" VARCHAR (80)NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "city" VARCHAR (80),
    "email" VARCHAR (80) NOT NULL,
    "DOB" DATE,
    "gender" VARCHAR (40),
    "role_id" INT REFERENCES "roles",
    "strava_id" VARCHAR (80)
);

CREATE TABLE "roles" (
	"id" SERIAL PRIMARY KEY,
	"role" VARCHAR,
	"access_level" int
	);

CREATE TABLE "athlete_info" (
    "id" SERIAL PRIMARY KEY,
    "athlete_id" INT REFERENCES "user",
    "coach_id" INT REFERENCES "user",
    "rest_day" INT REFERENCES "days_of_week",
    "long_run_day" INT REFERENCES "days_of_week",
    "speed_work" VARCHAR,
    "run_history" VARCHAR (80),
    "avg_weekly_mileage" VARCHAR (80),
    "injury" BOOLEAN,
    "injury_description" VARCHAR (1000),
    "medication" BOOLEAN,
    "medication_description" VARCHAR (1000),
    "health_risk_comments" VARCHAR (1000),
    "life_outside_running" VARCHAR (1000),
    "general_comments" VARCHAR (1000)
);

CREATE TABLE "invite" (
	"id" SERIAL PRIMARY KEY,
	"coach_id" INT REFERENCES "user",
	"athlete_id" INT REFERENCES "user",
	"status" INT REFERENCES "status",
	"temporary_key" VARCHAR
	);

CREATE TABLE "athlete_race" (
	"id" SERIAL PRIMARY KEY,
	"athlete_id" INT REFERENCES "athlete_info",
	"race_id" iNT REFERENCES "race_types"
	);

CREATE TABLE "athlete_other_excercise" (
	"id" SERIAL PRIMARY KEY,
	"athlete_info_id" INT REFERENCES "athlete_info",
	"other_exercise_id" INT REFERENCES "other_exercise"
);

SET timezone = 'America/Chicago';

CREATE TABLE "messages" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"message" VARCHAR (1000),
	"time_posted" TIMESTAMP
	);

CREATE TABLE "tips_and_tricks" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"title" VARCHAR (1000),
	"article_link" VARCHAR (1000),
	"comments" VARCHAR,
	"time_posted" TIMESTAMP,
	"type" INT REFERENCES "tips_type"
	);

CREATE TABLE "workouts" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE NOT NULL,
	"athlete_id" INT REFERENCES "user",
	"coach_id" INT REFERENCES "user",
	"description" VARCHAR, 
	"complete_status" BOOLEAN
	);

CREATE TABLE "workout_details" (
	"id" SERIAL PRIMARY KEY,
	"workout_id" INT REFERENCES "workouts",
	"repetitions" INT,
	"distance" VARCHAR,
	"pace" VARCHAR,
	"step" INT REFERENCES "workout_steps"
	);