import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMessages(action) {
  try {
    //axios call to get all messages
    const response = yield axios.get('/api/message');
    yield put({
      type: 'SET_MESSAGES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

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
function* deleteMessage(action) {
  try {
    yield axios.delete(`/api/message/delete/${action.payload}`);
    yield put({
      type: 'GET_MESSAGES',
    });
  } catch (err) {
    console.log(err);
  }
}

function* messagesSaga() {
  yield takeLatest('GET_MESSAGES', getMessages);
  yield takeLatest('POST_MESSAGE', postMessage);
  yield takeLatest('DELETE_MESSAGE', deleteMessage);
}

export default messagesSaga;
