import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';
import channels from './channels';
import currentChannel from './currentChannel';

export default combineReducers({
  messages,
  users,
  channels,
  currentChannel,
});
