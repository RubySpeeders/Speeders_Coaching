// Used to store tips & tricks and types returned from the server

const tips = (state = [], action) => {
  switch (action.type) {
    case 'SET_TIPS':
      return action.payload;
    case 'SET_TIP_TYPES':
      return action.payload;
    default:
      return state;
  }
};

export default tips;
