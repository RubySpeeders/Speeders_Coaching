const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

//gets all steps of workout
router.get('/steps', (req, res) => {
  let queryText = `SELECT * FROM "workout_steps"`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error getting workout steps', error);
      res.sendStatus(500);
    });
});

// add a workout
router.post('/:id', rejectUnauthenticated, (req, res) => {
  const { date, description } = req.body;
  const athlete_id = req.params.id;
  const coach_id = req.user.id;
  let queryText = `INSERT INTO "workouts" (date, athlete_id, coach_id, description) VALUES ($1, $2, $3, $4);`;
  let queryArray = [date, athlete_id, coach_id, description];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error posting workout', error);
      res.sendStatus(500);
    });
});

module.exports = router;
