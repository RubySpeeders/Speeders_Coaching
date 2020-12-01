import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSteps(action) {
  try {
    //axios call to get all days
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

function* getStepsSaga() {
  yield takeLatest('GET_STEPS', getSteps);
}

export default getStepsSaga;
