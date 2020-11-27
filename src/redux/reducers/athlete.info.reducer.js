// Used to store athlete info returned from the server

const messages = (state = [], action) => {
  switch (action.type) {
    case 'SET_ATHLETES':
      return action.payload;
    default:
      return state;
  }
};

export default messages;
