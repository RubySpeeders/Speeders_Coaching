const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// get all tips & tricks
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT title, article_link, type, comments, time_posted, "user".first_name, "user".last_name, "tips_and_tricks".id FROM "tips_and_tricks"
  JOIN "user" ON "tips_and_tricks".user_id="user".id
  ORDER BY time_posted;`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error getting tips & tricks', error);
      res.sendStatus(500);
    });
});

// get all tips types
router.get('/type', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "tips_type";`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error getting tips type', error);
      res.sendStatus(500);
    });
});

// add another tip & trick
router.post('/', rejectUnauthenticated, (req, res) => {
  const user_id = req.user.id;
  const title = req.body.title;
  const article_link = req.body.article_link;
  const type = req.body.type;
  const comments = req.body.comments;
  let queryText = `INSERT INTO "tips_and_tricks" (user_id, title, article_link, type, comments, time_posted) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP);`;
  let queryArray = [user_id, title, article_link, type, comments];
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

//delete a tip
router.delete('/delete/:id', (req, res) => {
  const queryText = `DELETE FROM "tips_and_tricks" WHERE id=$1;`;
  const queryArrayData = [req.params.id];

  pool
    .query(queryText, queryArrayData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//edit a tip
router.put('/update/:id', (req, res) => {
  const { new_title, new_article, new_comments } = req.body;
  const tip_id = req.params.id;
  const queryText = `UPDATE "tips_and_tricks" SET title = $1, article_link = $2, comments = $3, time_posted=CURRENT_TIMESTAMP WHERE id=$4;`;
  const queryArray = [new_title, new_article, new_comments, tip_id];

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

module.exports = router;
