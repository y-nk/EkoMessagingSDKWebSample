const messages = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_MESSAGE':
      return [
        {
          message: action.message,
          author: action.author,
          fresh: action.fresh,
          id: action.id,
        },  
        ...state,
      ]
    case 'ADD_MESSAGE':
      return [
        ...state,
        {
          message: action.message,
          author: action.author,
          fresh: action.fresh,
          id: action.id,
        },       
      ]
    case 'DELETE_MESSAGE':
      return [
          ...state.slice(0, state.length - 1)
      ]
      
    case 'UNLOAD_MESSAGE':
      return [
        
      ]
    case 'MESSAGE_RECEIVED':
      return state.concat([
        {
          message: action.message,
          author: action.author,
          fresh: action.fresh,
          id: action.id,
        },
      ]);
    default:
      return state;
  }
};

export default messages;