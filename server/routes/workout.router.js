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
  const athlete_id = req.body.athlete_id;
  let queryText = `SELECT * FROM "workouts"
  JOIN "workout_details" ON "workouts".id = "workout_details".workout_id
  WHERE athlete_id = $1;`;
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
// router.post('/:id', rejectUnauthenticated, (req, res) => {
//   const { date, description } = req.body;
//   const athlete_id = req.params.id;
//   const coach_id = req.user.id;
//   let queryText = `INSERT INTO "workouts" (date, athlete_id, coach_id, description) VALUES ($1, $2, $3, $4) RETURNING id;`;
//   let queryArray = [date, athlete_id, coach_id, description];
//   pool
//     .query(queryText, queryArray)
//     .then((dbResponse) => {
//       const workout_id = dbResponse.rows[0].id;
//       for (let i = 0; i < race_type_list.length; i++) {
//         const race_key = race_type_list[i];
//         const race_value = req.body.race_type[race_key];
//         if (race_value) {
//           const queryText = `INSERT INTO "workout_details" (workout_id, repetitions, distance, pace, step) VALUES ($1, $2, $3, $4, $5);`;
//           const queryArray = [athlete_info_id, race_key];
//           athlete_race_array.push(pool.query(queryText, queryArray));
//         }
//       }
//       Promise.all(athlete_race_array).then((dbResponse) => {
//         res.sendStatus(201);
//       });
//      const repetitions = req.body.
//       let queryText = ``;
//       let queryArray = [workout_id];
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.log('error posting workout', error);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
