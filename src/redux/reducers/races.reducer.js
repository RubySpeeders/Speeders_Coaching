// Used to store races returned from the server

const races = (state = [], action) => {
  switch (action.type) {
    case 'SET_RACES':
      return action.payload;
    default:
      return state;
  }
};

export default races;
