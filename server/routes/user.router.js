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
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/register/athlete', (req, res, next) => {
  const username = req.body.username;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const role_id = 2;

  const queryText = `INSERT INTO "user" (username, first_name, last_name, email, role_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
  const queryArray = [username, first_name, last_name, email, role_id];
  pool.query(queryText, queryArray).then((dbResponse) => {
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
        const new_athlete_id = dbResponse.rows[0].athlete_id;
        const coach_id = req.user.id;
        const queryText = `INSERT INTO "athlete_info" (athlete_id, coach_id) VALUES ($1, $2);`;
        const queryArray = [new_athlete_id, coach_id];
        pool
          .query(queryText, queryArray)
          .then((dbResponse) => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log('User registration failed for athlete_info: ', err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log('User registration failed for invite: ', err);
        res.sendStatus(500);
      })
      .catch((err) => {
        console.log('User registration failed for invite: ', err);
        res.sendStatus(500);
      });
  });
});

//updates athlete registration after the coach sends a link to the athlete
router.put('/register/athlete/:id', (req, res) => {
  // PUT route code here
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const city = req.body.city;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const strava_id = req.body.strava_id;
  const athlete_id = req.params.id;
  const queryText = `UPDATE "user" SET username=$1, password=$2, city=$3, dob=$4, gender=$5, strava_id=$6 WHERE "id"=$7;`;
  const queryArray = [
    username,
    password,
    city,
    dob,
    gender,
    strava_id,
    athlete_id,
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

//sends new athlete_info data when athlete registers.
router.post('/register/athlete/page2/:id', (req, res, next) => {
  const rest_day = req.body.rest_day;
  const long_run_day = req.body.long_run_day;
  const speed_work = req.body.speed_work;
  const run_history = req.body.run_history;
  const avg_weekly_mileage = req.body.avg_weekly_mileage;
  const injury = req.body.injury;
  const injury_description = req.body.injury_description;
  const medication = req.body.medication;
  const medication_description = req.body.medication_description;
  const health_risk_comments = req.body.health_risk_comments;
  const life_outside_running = req.body.life_outside_running;
  const general_comments = req.body.general_comments;

  const queryText = `INSERT INTO "athlete_info" (rest_day, long_run_day, speed_work, run_history, avg_weekly_mileage, injury, injury_description, medication, medication_description, health_risk_comments, life_outside_running, general_comments)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id;`;
  const queryArray = [
    rest_day,
    long_run_day,
    speed_work,
    run_history,
    avg_weekly_mileage,
    injury,
    injury_description,
    medication,
    medication_description,
    health_risk_comments,
    life_outside_running,
    general_comments,
  ];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('massive error', err);
      res.sendStatus(500);
    });
});

router.post('/register/athlete/page3', (req, res) => {
  try {
    console.log(req.user);
    pool
      .query(
        `SELECT "athlete_info".id FROM "athlete_info" WHERE "athlete_id"=$1;`,
        [req.user.id]
      )
      .then((dbResponse) => {
        console.log(dbResponse.rows);
        const athlete_info_id = dbResponse.rows[0].id;
        const other_exercise_list = Object.keys(req.body.other_exercise);
        const athlete_exercise_array = [];
        //iterate through the array of checked off other exercises
        for (let i = 0; i < other_exercise_list.length; i++) {
          const exercise_key = other_exercise_list[i];
          const exercise_value = req.body.other_exercise[exercise_key];
          if (exercise_value) {
            const queryText = `INSERT INTO "athlete_other_exercise" (athlete_info_id, other_exercise_id) VALUES ($1, $2);`;
            const queryArray = [athlete_info_id, exercise_key];
            athlete_exercise_array.push(pool.query(queryText, queryArray));
          }
        }
        Promise.all(athlete_exercise_array).then((dbResponse) => {
          res.sendStatus(201);
        });
      });
  } catch (err) {
    console.log('first query post', err);
    res.sendStatus(500);
  }
});

//updates invite from pending to completed after registration is complete
router.put('/register/athlete/:id', (req, res) => {
  const queryText = `UPDATE "invite" SET status=2 WHERE "athlete_id"=$1;`;
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

//deletes an athlete
router.delete('/delete/athlete/:id', (req, res) => {
  const queryText = `DELETE FROM "invite" WHERE athlete_id=$1;`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      const queryText = `DELETE FROM "athlete_info" WHERE athlete_id=$1;`;
      const queryArray = [req.params.id];
      pool
        .query(queryText, queryArray)
        .then((dbResponse) => {
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
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//gets all days of the week
router.get('/register/days', (req, res) => {
  let queryText = `SELECT * FROM "days_of_week"`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error getting days of the week', error);
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
