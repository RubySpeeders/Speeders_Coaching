import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateAthlete(action) {
  try {
    const id = iDontKnow;
    //axios call to add message
    yield axios.put(`/register/athlete/${id}`, action.payload);
  } catch (err) {
    console.log(err);
  }
}

function* updateAthleteSaga() {
  yield takeLatest('UPDATE_ATHLETE', updateAthlete);
}

export default updateAthleteSaga;
