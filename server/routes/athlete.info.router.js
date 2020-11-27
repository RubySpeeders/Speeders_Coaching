const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// get all messages for the message board
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = ` SELECT * FROM "user" WHERE "role_id" = 2;`;

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

module.exports = router;
