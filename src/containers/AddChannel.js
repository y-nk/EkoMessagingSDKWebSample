import { connect } from 'react-redux';
import AddChannelComponent from '../components/Channel/AddChannel';
import { setChannel, setCurrentChannel, unloadMessage, loadMessage } from '../actions';

export const AddChannel = connect(
  state => ({
    currentChannel: state.currentChannel,
  }),
  dispatch => ({
    loadMessage: (message, author) => dispatch(loadMessage(message, author)),
    setChannel: (value) => dispatch(setChannel(value)),
    setCurrentChannel: (value) => dispatch(setCurrentChannel(value)),
    unloadMessage: () => dispatch(unloadMessage()),
  }),
)(AddChannelComponent)