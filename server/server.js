const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const messageRouter = require('./routes/message.router');
const tipsRouter = require('./routes/tips.router');
const athleteInfoRouter = require('./routes/athlete.info.router');
const daysRouter = require('./routes/days.router');
const racesRouter = require('./routes/races.router');
const exercisesRouter = require('./routes/exercises.router');
const workoutRouter = require('./routes/workout.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/tips', tipsRouter);
app.use('/api/athlete/info', athleteInfoRouter);
app.use('/api/days', daysRouter);
app.use('/api/races', racesRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/workout', workoutRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
