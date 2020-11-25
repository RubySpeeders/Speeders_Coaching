import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postMessage(action) {
  try {
    //axios call to add message
    yield axios.post(`/api/message`, action.payload);
    //axios call to get all messages (with new added message)
    yield put({
      type: 'GET_MESSAGES',
    });
  } catch (err) {
    console.log(err);
  }
}

function* postMessageSaga() {
  yield takeLatest('POST_MESSAGE', postMessage);
}

export default postMessageSaga;
