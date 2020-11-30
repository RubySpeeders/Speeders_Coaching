import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import messages from './messages.reducer';
import tips from './tips.reducer';
import days from './days.reducer';
import athletes from './athlete.info.reducer';
import races from './races.reducer';
import exercises from './exercises.reducer';
import athleteRegistration from './athlete.registration.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  messages,
  tips,
  days,
  athletes,
  races,
  exercises,
  athleteRegistration,
});

export default rootReducer;
