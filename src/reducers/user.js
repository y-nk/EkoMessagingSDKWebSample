export const userReducer = (state, action) => {
  switch (action.type) {
    case 'setCurrentChannelId':
      return {
        currentChannelId: action.currentChannelId,
      };

    default:
      return state;
  }
};
