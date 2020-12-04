import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getWorkoutSteps(action) {
  try {
    //axios call to get all workout steps
    const response = yield axios.get('/api/workout/steps');
    console.log(response.data);
    yield put({
      type: 'SET_STEPS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getWorkouts(action) {
  try {
    //axios call to get all workouts for that specific athlete
    const response = yield axios.get(`/api/workout/athlete/${action.payload}`);
    yield put({
      type: 'SET_WORKOUTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* postWorkout(action) {
  try {
    //axios call to post workouts for that specific athlete
    yield axios.post(
      `/api/workout/add/${action.payload.athlete_id}`,
      action.payload.entire_workout
    );
    // yield put({
    //   type: 'GET_WORKOUTS',

    // });
  } catch (err) {
    console.log(err);
  }
}

function* getWorkoutDetail(action) {
  try {
    //axios call to get specific workout
    const response = yield axios.get(`/api/workout/specific/${action.payload}`);
    yield put({
      type: 'SET_WORKOUT_DETAILS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* workoutSaga() {
  yield takeLatest('GET_STEPS', getWorkoutSteps);
  yield takeLatest('GET_WORKOUTS', getWorkouts);
  yield takeLatest('POST_WORKOUT', postWorkout);
  yield takeLatest('GET_WORKOUT_DETAIL', getWorkoutDetail);
}

export default workoutSaga;
