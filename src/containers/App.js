import { connect } from 'react-redux';
import AppComponent from '../App';
import { loadMessage, addUser, setChannel, setCurrentChannel } from '../actions';

export const App = connect(
    state => ({
        user: state.users,
        channel: state.channels,
        currentChannel: state.currentChannel,
    }),
    dispatch => ({
        loadMessage: (message, author) => dispatch(loadMessage(message, author)),
        addUser: name => dispatch(addUser(name)),
        setChannel: value => dispatch(setChannel(value)),
        setCurrentChannel: value => dispatch(setCurrentChannel(value)),
    }),
)(AppComponent)