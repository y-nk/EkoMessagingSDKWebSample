const messages = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_MESSAGE':
      return [
        ...state,
        {
          message: action.message,
          author: action.author,
          id: action.id,
        },  
      ]
    case 'ADD_MESSAGE':
      return [
        {
          message: action.message,
          author: action.author,
          id: action.id,
        },
        ...state,
      ]
    case 'UNLOAD_MESSAGE':
      return [
        
      ]
    case 'MESSAGE_RECEIVED':
      return state.concat([
        {
          message: action.message,
          author: action.author,
          id: action.id,
        },
      ]);
    default:
      return state;
  }
};

export default messages;