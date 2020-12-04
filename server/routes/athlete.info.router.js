const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// get all athletes
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT id, first_name, last_name, strava_id, city, dob, gender, email FROM "user" WHERE "role_id" = 2 ORDER BY "last_name";`;

  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error getting athlete info', error);
      res.sendStatus(500);
    });
});

//get details for specific athlete
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.params.id);
  const queryText = `SELECT "user".id, first_name, last_name, strava_id, city, dob, gender, email, health_risk_comments, long_run_day, speed_work, rest_day, run_history, avg_weekly_mileage, injury, injury_description, medication, medication_description, life_outside_running, general_comments FROM "user"
  JOIN "athlete_info" ON "user".id="athlete_info".athlete_id
  WHERE "user".id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log(result.rows);
      if (result.rows.length < 1) {
        res.sendStatus(204);
      }
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT athlete details query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
