import 'antd/dist/antd.css';

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
    channels: [],
    currentChannelId: 'newChannel',
  }

  componentDidMount() {
    // Establish current user (only for demo purpose)
    const currentUser = client.currentUser;

    // On current user data update, run the following code
    currentUser.on('dataUpdated', model => {
      console.log(`Current user: ${model.userId}, Display Name: ${model.displayName}`);
    });

    // Set up static channels
    const staticChanelIdsList = [
      'newChannel',
      'ANDROID',
      'public_eko',
    ]
    // Get channel tags for each channel
    staticChanelIdsList.map(channel => {
      // Instantiate new Channel Repository
      const channelRepo = new ChannelRepository();
      const liveChannel = channelRepo.channelForId(channel);
      // On dataUpdated, retrieve the tags for the channel
      return liveChannel.once('dataUpdated', data => {
        this.setState({
          channels: [...this.state.channels, ...[data]]
        })
        liveChannel.dispose()
      })
    });
  }

  componentWillUnmount() {
    // Dispose connection
    client.removeAllListeners('connectionStatusChanged');
  }

  // Check if channel does not already exist
  existingChannel = (value, channelArray) => {
    const channelIds = []
    channelArray.map(channel => (
      channelIds.push(channel.channelId)
      ))
    channelIds.some(channel =>
      channel.toLowerCase() === value.toLowerCase()
    )
  }

  // Add channel to local state
  addChannel = channelId => {
    const channelRepo = new ChannelRepository();
      const liveChannel = channelRepo.channelForId(channelId);
      return liveChannel.once('dataUpdated', data => {
        this.setState({
          channels: [...this.state.channels, ...[data]]
        })
        liveChannel.dispose()
      })
  }

  // Join selected Channel
  joinChannel = channelId => {
    // Instantiate Channel Repository
    const channelRepo = new ChannelRepository();
    // Join Channel
    channelRepo.joinChannel({
      channelId: channelId,
      type: EkoChannelType.Standard,
    });
    this.setState({
      currentChannelId: channelId
    })
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
              currentChannelId={this.state.currentChannelId}
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
              currentChannelId={this.state.currentChannelId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
