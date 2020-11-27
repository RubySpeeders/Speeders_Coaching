import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAthleteInfo(action) {
  try {
    //axios call to get all messages
    const response = yield axios.get('/api/athlete/info');
    console.log(response.data);
    yield put({
      type: 'SET_ATHLETES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getAthletesSaga() {
  yield takeLatest('GET_ATHLETES', getAthleteInfo);
}

export default getAthletesSaga;
