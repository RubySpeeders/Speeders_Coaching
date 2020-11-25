import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMessages(action) {
  try {
    //axios call to get all messages
    const response = yield axios.get('/api/message');
    console.log(response.data);
    yield put({
      type: 'SET_MESSAGES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getMessagesSaga() {
  yield takeLatest('GET_MESSAGES', getMessages);
}

export default getMessagesSaga;
