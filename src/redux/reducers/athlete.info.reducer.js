import { combineReducers } from 'redux';

// Used to store athlete info returned from the server
const athletes = (state = [], action) => {
  switch (action.type) {
    case 'SET_ATHLETES':
      return action.payload;
    default:
      return state;
  }
};

//Used to store athlete details returned from server
const athleteDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_ATHLETE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  athletes,
  athleteDetails,
});
