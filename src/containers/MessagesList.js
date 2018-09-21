import { connect } from 'react-redux';
import MessagesListComponent from '../components/MessagesList';
import { loadMessage } from '../actions';

export const MessagesList = connect(
  state => ({
    messages: state.messages,
    currentChannel: state.currentChannel,
  }), 
  dispatch => ({
    loadMessage: (message, author) => dispatch(loadMessage(message, author)),
  }),
  )(MessagesListComponent)