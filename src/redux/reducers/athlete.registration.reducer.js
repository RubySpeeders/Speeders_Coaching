// Used to store athlete registration information

const registrationReducer = (state = {}, action) => {
  if (action.type === 'UPDATE_ATHLETE') {
    return { ...state, ...action.payload };
  }
  return state;
};

export default registrationReducer;
