const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//custom imports
const randomNumber = require('../modules/randomKeyGenerator');

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register/coach', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const city = req.body.city;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const role_id = 1;
  const strava_id = req.body.strava_id;

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, city, email, dob, gender, role_id, strava_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`;
  const queryArray = [
    username,
    password,
    first_name,
    last_name,
    city,
    email,
    dob,
    gender,
    role_id,
    strava_id,
  ];
  pool
    .query(queryText, queryArray)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/register/athlete', (req, res, next) => {
  const username = req.body.username;
  const password = 'TBD';
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const city = 'TBD';
  const email = req.body.email;
  const dob = '01/01/01';
  const gender = 'TBD';
  const role_id = 2;
  const strava_id = 'TBD';

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, city, email, dob, gender, role_id, strava_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`;
  const queryArray = [
    username,
    password,
    first_name,
    last_name,
    city,
    email,
    dob,
    gender,
    role_id,
    strava_id,
  ];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      const pendingStatus = 1;
      const temporary_key = randomNumber();
      const new_athlete_id = dbResponse.rows[0].id;
      const queryText = `INSERT INTO "invite" (coach_id, athlete_id, status, temporary_key) VALUES ($1, $2, $3, $4) RETURNING athlete_id;`;
      const queryArray = [
        req.user.id,
        new_athlete_id,
        pendingStatus,
        temporary_key,
      ];
      pool
        .query(queryText, queryArray)
        .then((dbResponse) => {
          const new_athlete_id = dbResponse.rows[0].id;
          const rest = 1;
          const long_run = 1;
          const speed = false;
          const history = 'tbd';
          const avg = 'tbd';
          const injury = false;
          const injury_description = 'tbd';
          const med = false;
          const med_description = 'tbd';
          const health = 'tbd';
          const life = 'tbd';
          const general = 'tbd';
          const queryText = `INSERT INTO "athlete_info" (athlete_id, coach_id, rest_day, long_run_day, speed_work, run_history, avg_weekly_mileage, injury, injury_description, medication, medication_description, health_risk_comments, life_outside_running, general_comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
          const queryArray = [
            new_athlete_id,
            req.user.id,
            rest,
            long_run,
            speed,
            history,
            avg,
            injury,
            injury_description,
            med,
            med_description,
            health,
            life,
            general,
          ];
          pool
            .query(queryText, queryArray)
            .then((dbResponse) => {
              res.sendStatus(201);
            })
            .catch((err) => {
              console.log('User registration failed: ', err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.log('User registration failed: ', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

//updates athlete registration after the coach sends a link to the athlete
router.put('/register/athlete/:id', (req, res) => {
  // PUT route code here
  const queryText = `UPDATE "user" SET username=$1, password=$2, city=$3, dob=$4, gender=$5, strava_id=$6 WHERE "id"=$7;`;
  const queryArray = [
    req.body.username,
    encryptLib.encryptPassword(req.body.password),
    req.body.city,
    req.body.dob,
    req.body.gender,
    req.body.strava_id,
    req.params.id,
  ];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//deletes an athlete
router.delete('/delete/athlete/:id', (req, res) => {
  const queryText = `DELETE FROM "user" WHERE id=$1;`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//gets all athlete info
// router.get('/athlete', (req, res) => {

//   const queryText = `SELECT * FROM`
// });

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
