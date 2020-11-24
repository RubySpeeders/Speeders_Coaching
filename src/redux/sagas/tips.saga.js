import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTips(action) {
  try {
    //axios call to get all messages
    const response = yield axios.get('/api/tips');
    console.log(response.data);
    yield put({
      type: 'SET_TIPS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getTipsSaga() {
  yield takeLatest('GET_TIPS', getTips);
}

export default getTipsSaga;
