const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//gets all days of the week
router.get('/', (req, res) => {
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

module.exports = router;
