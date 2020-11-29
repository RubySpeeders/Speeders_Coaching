import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAthleteInfo(action) {
  try {
    //axios call to get all messages
    const response = yield axios.get('/api/athlete/info');
    console.log(response.data);
    yield put({
      type: 'SET_ATHLETES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getAthleteDetails(action) {
  try {
    //axios call to get movie details for specific id
    const id = action.payload;
    const detailsResponse = yield axios.get(`/api/athlete/info/details/${id}`);
    // //axios call to get the genre details for specific id
    // const genresResponse = yield axios.get(
    //   `/api/genre/details/${action.payload}`
    // );
    yield put({
      type: 'SET_ATHLETE_DETAILS',
      payload: detailsResponse.data[0],
    });
  } catch (err) {
    console.log('details error', err);
  }
}

function* athletesSaga() {
  yield takeLatest('GET_ATHLETES', getAthleteInfo);
  yield takeLatest('GET_ATHLETE_DETAILS', getAthleteDetails);
}

export default athletesSaga;
