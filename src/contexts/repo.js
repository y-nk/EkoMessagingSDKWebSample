export const repoReducer = (state, action) => {
  switch (action.type) {
    case 'setRepo':
      return {
        ...state,
        currentChannelId: action.currentChannelId,
      };

    default:
      return state;
  }
};
