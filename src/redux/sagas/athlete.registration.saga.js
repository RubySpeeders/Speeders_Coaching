import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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
    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (err) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* updateAthleteSaga() {
  yield takeLatest('FINALISE_ATHLETE', updateAthleteRegistration);
}

// const mapStoreToProps = (store) => ({
//   store,
// });

export default updateAthleteSaga;
