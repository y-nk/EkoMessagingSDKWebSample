export const channelReducer = (state, action) => {
  switch (action.type) {
    case 'setCurrentChannelId':
      return {
        ...state,
        currentChannelId: action.currentChannelId,
      };

    default:
      return state;
  }
};
