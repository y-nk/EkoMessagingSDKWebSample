import React, { Component } from 'react';
import { MessagesList } from './containers/MessagesList';
import { AddMessage } from './containers/AddMessage';
import { Channel } from './containers/Channel';
import Header from './components/Header';
import client, { messageRepo } from './EkoSDK';
import { EkoConnectionStatus } from 'eko-sdk';

class App extends Component {
  componentDidMount() {
    client.on('connectionStatusChanged', ({ newValue, oldValue }) => {
      if (newValue === EkoConnectionStatus.Connected) {
        const currentUser = client.currentUser;
        currentUser.on('dataUpdated', model => {
          console.log(`Current user: ${model.userId}, Display Name: ${model.displayName}`);
          this.props.addUser(model.userId);
          this.props.setChannel('newChannel');
          this.props.setCurrentChannel('newChannel');
          this.props.setChannel('ANDROID');
          this.props.setChannel('public_eko');
          const messages = messageRepo.messagesForChannel({ channelId: this.props.currentChannel });
          messages.on('dataUpdated', data => {
            data.map(message =>
              this.props.loadMessage(message.data.text, message.userId)
            );
            // messages.removeAllListeners('dataUpdated');
          });
        })
      }
    });
  }

  // componentWillUnmount() {
  //   client.removeAllListeners('connectionStatusChanged');
  // }

  render() {
    return (
      <div id="container">
        <Header />
        <div className="row">
          <div id="left">
            <Channel />
          </div>
          <div id="right">
            <MessagesList />
            <AddMessage />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
