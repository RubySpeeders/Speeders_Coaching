const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//gets all steps of workout
router.get('/', (req, res) => {
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

module.exports = router;
