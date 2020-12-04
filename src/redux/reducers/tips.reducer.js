// Used to store tips & tricks returned from the server

const tips = (state = [], action) => {
  switch (action.type) {
    case 'SET_TIPS':
      return action.payload;
    default:
      return state;
  }
};

export default tips;
