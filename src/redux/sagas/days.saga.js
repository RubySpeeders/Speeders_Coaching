import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getDays(action) {
  try {
    //axios call to get all days
    const response = yield axios.get('/api/days');
    console.log(response.data);
    yield put({
      type: 'SET_DAYS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getDaysSaga() {
  yield takeLatest('GET_DAYS', getDays);
}

export default getDaysSaga;
