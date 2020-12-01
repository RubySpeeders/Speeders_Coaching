const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const nodemailer = require('nodemailer');

const router = express.Router();

//custom imports
const { generateUUID } = require('../services/uuid.service');

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register/coach', (req, res, next) => {
  const {
    username,
    first_name,
    last_name,
    city,
    email,
    dob,
    gender,
    strava_id,
  } = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  const role_id = 1;

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

//coach creates a new athlete
router.post('/register/athlete', rejectUnauthenticated, (req, res, next) => {
  const queryText = `SELECT * FROM "user"
  JOIN "roles" on "user".role_id = "roles".id
  WHERE "user".id = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((dbResponse) => {
      const user = dbResponse.rows[0];
      if (user.access_level === 1) {
        //create temporary user
        const { first_name, last_name, email } = req.body;
        const role_id = 2;
        const queryText = `INSERT INTO "user" (first_name, last_name, email, role_id)
        VALUES ($1, $2, $3, $4) RETURNING id;`;
        const queryArray = [first_name, last_name, email, role_id];
        pool
          .query(queryText, queryArray)
          .then((dbResponse) => {
            //create temporary UUID
            const temporary_key = generateUUID();
            const pendingStatus = 1;
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
                    // referenced from Myron Schippers' repo on nodemailer
                    //send a message to the athlete (nodemailer)
                    const transportConfig = {
                      service: 'gmail',
                      auth: {
                        user: process.env.MAILER_EMAIL,
                        pass: process.env.MAILER_PASSWORD,
                      },
                    };
                    let transporter = nodemailer.createTransport(
                      transportConfig
                    );
                    // create link url for user
                    let registerLinkBase = process.env.HOST_ENV;
                    const registerLink = `${registerLinkBase}/#/register/athlete/${temporary_key}`;
                    const mailOptions = {
                      from: req.user.email, // sender address
                      to: email, // list of receivers
                      subject: 'Welcome to Speeders Coaching', // Subject line
                      html: `<div>
                        <h1>Hello, ${first_name}!</h1>
                        <p>Please finalise your registration to Speeders Coaching by following the link below.</p>
                        <a href="${registerLink}" target="_blank">Continue Registration</a>
                      </div>`, // plain text body
                    };

                    transporter.sendMail(mailOptions, (err, info) => {
                      if (err != null) {
                        res.sendStatus(500);
                        return;
                      }

                      res.sendStatus(201);
                    });
                  })
                  .catch((err) => {
                    console.log('error with athlete_info', err);
                  });
              })
              .catch((err) => {
                console.log('error with invite', err);
                res.sendStatus(500);
              });
          })
          .catch((err) => {
            console.log('error with user', err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
});

// GET a user that has the matched temporary ID
router.get('/register/athlete/:tempId', (req, res) => {
  // STEP 1: see if there is a user that matches the "tempId"
  const queryForTempUser = `	SELECT "user".first_name, "user".last_name, "user".email, "invite".temporary_key FROM "user"
	JOIN "invite" ON "user".id="invite".athlete_id
    WHERE temporary_key = $1;`;
  const queryArray = [req.params.tempId];
  pool
    .query(queryForTempUser, queryArray)
    .then((dbResp) => {
      const tempUser = dbResp.rows[0];

      if (tempUser != null) {
        // STEP 2: send back user info for matched user
        res.send(tempUser);
        return;
      }

      // STEP 3: if there is no match then send back error 403
      res.sendStatus(403);
    })
    .catch((err) => {
      logError(err);
      res.sendStatus(500);
    });
});

//updates athlete registration after the coach sends a link to the athlete
router.put('/register/athlete/:tempId', (req, res) => {
  // PUT route code here
  const temporary_key = req.params.tempId;
  console.log(temporary_key);
  const queryText = `SELECT "user".id from "user"
      JOIN "invite" ON "user".id="invite".athlete_id
      WHERE "temporary_key"=$1;`;
  const queryArray = [temporary_key];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      console.log(dbResponse.rows[0].id);
      const athlete_id = dbResponse.rows[0].id;
      const {
        username,
        first_name,
        last_name,
        city,
        email,
        dob,
        gender,
        strava_id,
      } = req.body;
      const password = encryptLib.encryptPassword(req.body.password);
      const queryText = `UPDATE "user" SET username=$1, password=$2, first_name=$3, last_name=$4, city=$5, email=$6, dob=$7, gender=$8, strava_id=$9 WHERE id=$10 RETURNING "user".id;`;
      const queryArray = [
        username,
        password,
        first_name,
        last_name,
        city,
        email,
        dob,
        gender,
        strava_id,
        athlete_id,
      ];
      pool
        .query(queryText, queryArray)
        .then((dbResponse) => {
          console.log(dbResponse.rows);
          const {
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
          } = req.body;
          const athlete_id = dbResponse.rows[0].id;
          const queryText = `UPDATE "athlete_info" SET rest_day=$1, long_run_day=$2, speed_work=$3, run_history=$4, avg_weekly_mileage=$5, injury=$6, injury_description=$7, medication=$8, medication_description=$9, health_risk_comments=$10, life_outside_running=$11, general_comments=$12 WHERE athlete_id=$13`;
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
            athlete_id,
          ];
          pool
            .query(queryText, queryArray)
            .then((dbResponse) => {
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log('error in the athlete_info table', err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.log('error in the user table', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('error in the select to get ids', err);
      res.sendStatus(500);
    });
});

router.post('/register/athlete/:tempId', (req, res) => {
  try {
    const queryText = `SELECT "athlete_info".id, "invite".temporary_key FROM "athlete_info"
    JOIN "user" on "athlete_info".athlete_id="user".id
    JOIN "invite" on "user".id="invite".athlete_id WHERE "temporary_key"=$1;`;
    const queryArray = [req.params.tempId];
    pool.query(queryText, queryArray).then((dbResponse) => {
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
        const race_type_list = Object.keys(req.body.race_type);
        const athlete_race_array = [];
        //iterate through the array of checked off races
        for (let i = 0; i < race_type_list.length; i++) {
          const race_key = race_type_list[i];
          const race_value = req.body.race_type[race_key];
          if (race_value) {
            const queryText = `INSERT INTO "athlete_race" (athlete_info_id, race_id) VALUES ($1, $2);`;
            const queryArray = [athlete_info_id, race_key];
            athlete_race_array.push(pool.query(queryText, queryArray));
          }
        }
        Promise.all(athlete_race_array).then((dbResponse) => {
          res.sendStatus(201);
        });
      });
    });
  } catch (err) {
    console.log('error inserting into junction tables', err);
    res.sendStatus(500);
  }
});

//updates invite from pending to completed after registration is complete
router.put('/register/athlete/part3/:tempId', (req, res) => {
  const temporary_key = req.params.tempId;
  const queryText = `UPDATE "invite" SET status=2  temporary_key=$1 WHERE temporary_key=$2;`;
  const queryArray = [null, temporary_key];
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
  const queryText = `DELETE FROM "invite" WHERE athlete_id=$1 RETURNING "athlete_id";`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      console.log(dbResponse.rows[0]);
      const queryText = `DELETE FROM "athlete_info" JOIN "athlete_other_exercise" ON "athlete_info".id = "athlete_other_exercise".athlete_info_id;`;
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
