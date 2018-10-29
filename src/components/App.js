import React, { PureComponent } from 'react';
import EkoClient, {
  MessageRepository,
  ChannelRepository,
  EkoChannelType,
} from 'eko-sdk';

import SdkConfig from './../sdk-config';
import ChannelListPanel from './ChannelListPanel';
import MessageList from './MessagesList';
import AddMessage from './MessagesList/AddMessage';
import Header from './Header';


// Connect to EkoClient with apiKey
const client = new EkoClient({ apiKey: SdkConfig.SAMPLE_APP_KEY });
// Register Session with EkoClient with userId and display name
client.registerSession({
  userId: SdkConfig.DEFAULT_USER.USER_ID,
  displayName: SdkConfig.DEFAULT_USER.DISPLAY_NAME,
});


class App extends PureComponent {
  state = {
    channels: [
      'newChannel',
      'ANDROID',
      'public_eko',
    ],
    currentChannelId: 'newChannel',
  }

  componentDidMount() {
    // Establish current user (only for demo purpose)
    const currentUser = client.currentUser;

    // On current user data update, run the following code.
    currentUser.on('dataUpdated', model => {
      console.log(`Current user: ${model.userId}, Display Name: ${model.displayName}`);
    });
  }

  componentWillUnmount() {
    // Dispose connection
    client.removeAllListeners('connectionStatusChanged');
  }

  // Check if channel does not already exist
  existingChannel = (Value, ChannelArray) => {
    ChannelArray.some(channel =>
      channel.toLowerCase() === Value.toLowerCase()
    )
  }

  // Add channel to local state
  addChannel = (Channel) => {
    this.setState({ channels: [...this.state.channels, Channel ] })
  }

  // Join selected Channel
  joinChannel = (Channel) => {
    // Instantiate Channel Repository
    const channelRepo = new ChannelRepository();
    // Join Channel
    const liveChannel = channelRepo.joinChannel({
      channelId: Channel,
      type: EkoChannelType.Standard,
    });
    // Once Channel has been joined, run the following code.
    liveChannel.once('dataUpdated', model => {
      this.setState({ currentChannelId: model.channelId })
      console.log(`Channel joined: ${model.channelId}`);
    });
  }

  // Send message in Channel
  sendMessage = (message, channelId) => {
    // Instantiate Message Repository
    const messageRepo = new MessageRepository();
    // Send Message
    const messageLiveObject = messageRepo.createTextMessage({
      channelId,
      text: message,
    });
    // On message sent, run the following code.
    messageLiveObject.on('dataStatusChanged', data => {
      console.log(`Message sent`);
    });
  }

  render() {
    return (
      <div id="container">
        <Header />
        <div className="row">
          <div id="left">
            <ChannelListPanel
              channels={this.state.channels}
              currentChannel={this.state.currentChannelId}
              addChannel={this.addChannel}
              existingChannel={this.existingChannel}
              joinChannel={this.joinChannel}
            />
          </div>
          <div id="right">
            {this.state.currentChannelId && (
              <MessageList currentChannelId={this.state.currentChannelId} />
            )}
            <AddMessage
              sendMessage={this.sendMessage}
              currentChannel={this.state.currentChannelId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
