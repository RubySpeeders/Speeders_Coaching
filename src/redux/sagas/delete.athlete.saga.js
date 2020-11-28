import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteAthlete(action) {
  try {
    const id = action.payload;
    //axios call to delete athlete
    const response = yield axios.delete(`/api/user/delete/athlete/${id}`);
    console.log(response.data);
    yield put({
      type: 'GET_ATHLETES',
      // payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* deleteAthleteSaga() {
  yield takeLatest('DELETE_ATHLETE', deleteAthlete);
}

export default deleteAthleteSaga;
