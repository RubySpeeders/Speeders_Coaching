// Used to store workout steps returned from the server

const steps = (state = [], action) => {
  switch (action.type) {
    case 'SET_STEPS':
      return action.payload;
    default:
      return state;
  }
};

export default steps;