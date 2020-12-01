import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import mapStoreToProps from '../mapStoreToProps';
import { connect } from 'react-redux';

function* updateAthleteRegistration(action) {
  try {
    // updates first round of athlete registration information
    yield axios.put(
      `/api/user/register/athlete/${action.payload.temporary_key}`,
      action.payload.athlete
    );
    //inserts into new tables the new information
    yield axios.post(
      `/api/user/register/athlete/${action.payload.temporary_key}`,
      action.payload.athlete
    );
    yield axios.put(
      `/api/user/register/athlete/part3/${action.payload.temporary_key}`,
      action.payload.athlete
    );
  } catch (err) {
    console.log(err);
  }
}

function* updateAthleteSaga() {
  yield takeLatest('FINALISE_ATHLETE', updateAthleteRegistration);
}

// const mapStoreToProps = (store) => ({
//   store,
// });

export default updateAthleteSaga;
