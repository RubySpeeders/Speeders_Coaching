import { all } from 'redux-saga/effects';

// SAGAS
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import addAthleteSaga from './addAthlete.saga';
import userSaga from './user.saga';
import daysSaga from './days.saga';
import messagesSaga from './messages.saga';
import tipsSaga from './tips.saga';
import athletesSaga from './athletes.saga';
import deleteAthleteSaga from './delete.athlete.saga';
import getRacesSaga from './races.saga';
import exercisesSaga from './exercises.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    daysSaga(),
    messagesSaga(),
    tipsSaga(),
    addAthleteSaga(),
    athletesSaga(),
    deleteAthleteSaga(),
    getRacesSaga(),
    exercisesSaga(),
  ]);
}
