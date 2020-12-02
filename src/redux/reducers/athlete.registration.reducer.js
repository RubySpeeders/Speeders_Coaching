// Used to store athlete registration information

const athleteRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TEMP_USER':
      return action.payload;
    case 'UPDATE_ATHLETE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default athleteRegistrationReducer;
