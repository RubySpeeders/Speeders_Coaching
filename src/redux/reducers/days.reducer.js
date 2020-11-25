// Used to store days returned from the server

const days = (state = [], action) => {
  switch (action.type) {
    case 'SET_DAYS':
      return action.payload;
    default:
      return state;
  }
};

export default days;
