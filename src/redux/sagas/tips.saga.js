import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTips(action) {
  try {
    //axios call to get all messages
    const response = yield axios.get('/api/tips');
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

function* deleteTip(action) {
  try {
    yield axios.delete(`/api/tips/delete/${action.payload}`);
    yield put({
      type: 'GET_TIPS',
    });
  } catch (err) {
    console.log(err);
  }
}
function* editTip(action) {
  try {
    yield axios.put(
      `/api/tips/update/${action.payload.tip_id}`,
      action.payload.new_tip
    );
    yield put({
      type: 'GET_TIPS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* tipsSaga() {
  yield takeLatest('GET_TIPS', getTips);
  yield takeLatest('POST_TIP', postTip);
  yield takeLatest('GET_TIP_TYPES', getTipTypes);
  yield takeLatest('DELETE_TIP', deleteTip);
  yield takeLatest('UPDATE_TIP', editTip);
}

export default tipsSaga;
