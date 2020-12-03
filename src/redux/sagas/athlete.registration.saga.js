import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTempUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
    //get temp user information matching the temporary key
    const response = yield axios.get(
      `/api/user/register/athlete/${action.payload}`
    );
    //dispatch to set temporary user
    yield put({ type: 'SET_TEMP_USER', payload: response.data });
  } catch (error) {
    console.log('Error getting temp user information:', error);
    yield put({ type: 'REGISTRATION_FAILED_TEMP_USER_NOT_AVAILABLE' });
  }
}

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
    //updates athlete from pending to completed and deletes temporary key from invite table
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
    console.log('Error with user registration:', err);
    yield put({ type: 'REGISTRATION_FAILED_TEMP_USER' });
  }
}

function* updateAthleteSaga() {
  yield takeLatest('GET_TEMP_USER', getTempUser);
  yield takeLatest('FINALISE_ATHLETE', updateAthleteRegistration);
}

export default updateAthleteSaga;
