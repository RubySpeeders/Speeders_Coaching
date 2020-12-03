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
    console.log(response.data);
    yield put({
      type: 'SET_WORKOUTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* workoutSaga() {
  yield takeLatest('GET_STEPS', getWorkoutSteps);
  yield takeLatest('GET_WORKOUTS', getWorkouts);
}

export default workoutSaga;
