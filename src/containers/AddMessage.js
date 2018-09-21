import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage';
import { addMessage } from '../actions';

export const AddMessage = connect(
  state => ({
    user: state.users,
    currentChannel: state.currentChannel,
  }),
  dispatch => ({
    addMessage: (message, author) => dispatch(addMessage(message, author)),
  }),
)(AddMessageComponent)