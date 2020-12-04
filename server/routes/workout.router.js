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

//gets all workouts for specific athlete
router.get('/athlete/:id', (req, res) => {
  // JOIN "workout_details" ON "workouts".id = "workout_details".workout_id
  const athlete_id = req.params.id;
  let queryText = `SELECT * FROM "workouts"
  WHERE athlete_id = $1;`;
  let queryArray = [athlete_id];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error getting workout steps', error);
      res.sendStatus(500);
    });
});

// add a workout
router.post('/add/:id', rejectUnauthenticated, (req, res) => {
  try {
    const { date, description } = req.body;
    const athlete_id = req.params.id;
    const coach_id = req.user.id;
    let queryText = `INSERT INTO "workouts" (date, athlete_id, coach_id, description, complete_status) VALUES ($1, $2, $3, $4, false) RETURNING id;`;
    let queryArray = [date, athlete_id, coach_id, description];
    pool.query(queryText, queryArray).then((dbResponse) => {
      const workout_id = dbResponse.rows[0].id;
      const workout_array = req.body.workout;
      const new_workout_array = [];
      //iterate through array of workout steps
      for (let i = 0; i < workout_array.length; i++) {
        const workout_step = workout_array[i].step;
        const workout_rep = workout_array[i].rep;
        const workout_distance = workout_array[i].distance;
        const workout_pace = workout_array[i].pace;
        const queryText = `INSERT INTO "workout_details" (workout_id, repetitions, distance, pace, step) VALUES ($1, $2, $3, $4, $5);`;
        const queryArray = [
          workout_id,
          workout_rep,
          workout_distance,
          workout_pace,
          workout_step,
        ];
        new_workout_array.push(pool.query(queryText, queryArray));
      }
      Promise.all(new_workout_array).then(() => {
        res.sendStatus(201);
      });
    });
  } catch (error) {
    console.log('error posting workout', error);
    res.sendStatus(500);
  }
});

// //delete a workout
// router.delete('/delete/:id', (req, res) => {
//   const queryText = `DELETE FROM "workout_details" WHERE id=$1;`;
//   const queryArrayData = [req.params.id];

//   pool
//     .query(queryText, queryArrayData)
//     .then((dbResponse) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
