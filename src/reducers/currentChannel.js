const currentChannel = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENT_CHANNEL':
            return action.channel
        default:
            return state;
    }
};

export default currentChannel;
