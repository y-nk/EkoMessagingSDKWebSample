export const channelsReducer = (state, action) => {
  switch (action.type) {
    case 'loadChannels':
      return {
        ...state,
        currentChannelId: action.currentChannelId,
      };

    default:
      return state;
  }
};
