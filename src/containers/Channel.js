import { connect } from 'react-redux';
import ChannelComponent from '../components/Channel';
import { setChannel, setCurrentChannel, unloadMessage, loadMessage } from '../actions';

export const Channel = connect(
    state => ({
        channel: state.channels,
        currentChannel: state.currentChannel,
    }),
    dispatch => ({
        loadMessage: (message, author) => dispatch(loadMessage(message, author)),
        setChannel: (value) => dispatch(setChannel(value)),
        setCurrentChannel: (value) => dispatch(setCurrentChannel(value)),
        unloadMessage: () => dispatch(unloadMessage()),
    }),
)(ChannelComponent)