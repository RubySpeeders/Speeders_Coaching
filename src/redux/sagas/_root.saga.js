import { all } from 'redux-saga/effects';

// SAGAS
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import addAthleteSaga from './addAthlete.saga';
import userSaga from './user.saga';
import getMessagesSaga from './getMessages.saga';
import tipsSaga from './tips.saga';
import daysSaga from './days.saga';
import postMessageSaga from './postMessages.saga';
import postTipSaga from './postTip.saga';

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
    getMessagesSaga(),
    tipsSaga(),
    daysSaga(),
    postMessageSaga(),
    postTipSaga(),
    addAthleteSaga(),
  ]);
}
