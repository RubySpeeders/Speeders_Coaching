const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//gets all exercise types
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "other_exercise"`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error getting other exercises', error);
      res.sendStatus(500);
    });
});

module.exports = router;
