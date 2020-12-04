// Used to store types returned from the server

const tipTypes = (state = [], action) => {
  switch (action.type) {
    case 'SET_TIP_TYPES':
      return action.payload;
    default:
      return state;
  }
};

export default tipTypes;
