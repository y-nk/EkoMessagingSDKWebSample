import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage';
import { addMessage, deleteMessage } from '../actions';

export const AddMessage = connect(
  state => ({
    user: state.users,
    currentChannel: state.currentChannel,
  }),
  dispatch => ({
    addMessage: (message, author, fresh) => dispatch(addMessage(message, author, fresh)),
    deleteMessage: () => dispatch(deleteMessage()),
  }),
)(AddMessageComponent)