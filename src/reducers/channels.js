const channels = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHANNEL':
            return state.concat({
                channel: action.channel,
                id: action.id,
            })
        default:
            return state;
    }
};

export default channels;
