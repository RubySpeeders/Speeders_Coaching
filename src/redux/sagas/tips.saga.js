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

function* postTip(action) {
  try {
    //axios call to add message
    yield axios.post(`/api/tips`, action.payload);
    //axios call to get all messages (with new added message)
    yield put({
      type: 'GET_TIPS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* getTipTypes(action) {
  try {
    //axios call to get all types of tips
    const response = yield axios.get('/api/tips/type');
    console.log(response.data);
    yield put({
      type: 'SET_TIP_TYPES',
      payload: response.data,
    });
  } catch (err) {
    console.log('error getting tip types', err);
  }
}

function* tipsSaga() {
  yield takeLatest('GET_TIPS', getTips);
  yield takeLatest('POST_TIP', postTip);
  yield takeLatest('GET_TIP_TYPES', getTipTypes);
}

export default tipsSaga;
