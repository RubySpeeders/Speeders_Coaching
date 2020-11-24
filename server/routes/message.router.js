const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// get all messages for the message board
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = 'SELECT * FROM "messages" ORDER BY time_posted;';
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error getting messages', error);
      res.sendStatus(500);
    });
});

//  post a message on the message board
router.post('/', (req, res) => {
  const user_id = req.user.id;
  const message = req.body.message;
  let queryText = `INSERT INTO "messages" (user_id, message) VALUES ($1, $2);`;
  let queryArray = [user_id, message];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error posting message', error);
      res.sendStatus(500);
    });
});

module.exports = router;
