import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRaces(action) {
  try {
    //axios call to get all races
    const response = yield axios.get('/api/races');
    console.log(response.data);
    yield put({
      type: 'SET_RACES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getRacesSaga() {
  yield takeLatest('GET_RACES', getRaces);
}

export default getRacesSaga;
