const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// get all athletes
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = ` SELECT id, first_name, last_name, strava_id, city, dob, gender, email FROM "user" WHERE "role_id" = 2 ORDER BY "last_name";`;

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

router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT id, first_name, last_name, strava_id, city, dob, gender, email, FROM "user" WHERE "user".id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT athlete details query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
