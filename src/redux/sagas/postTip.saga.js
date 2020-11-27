import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

function* postTipSaga() {
  yield takeLatest('POST_TIP', postTip);
}

export default postTipSaga;
