import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getExercises(action) {
  try {
    //axios call to get all days
    const response = yield axios.get('/api/exercises');
    console.log(response.data);
    yield put({
      type: 'SET_EXERCISES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getExercisesSaga() {
  yield takeLatest('GET_EXERCISES', getExercises);
}

export default getExercisesSaga;
