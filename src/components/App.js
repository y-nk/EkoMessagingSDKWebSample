import React, { Component } from 'react';
import ChannelList from './ChannelList';
import MessageList from './MessagesList';
import AddMessage from './MessagesList/AddMessage';
import Header from './Header';
import EkoClient, {
  MessageRepository,
  ChannelRepository,
  EkoChannelType,
  EkoConnectionStatus
} from 'eko-sdk';

import SdkConfig from './../sdk-config';

// Connect to EkoClient with apiKey
const client = new EkoClient({ apiKey: SdkConfig.SAMPLE_APP_KEY });
// Register Session with EkoClient with userId and display name
client.registerSession({ userId: 'user987', displayName: 'John Coltrane' });

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: [
        'newChannel',
        'ANDROID',
        'public_eko',
      ],
      currentUser: '',
      currentChannel: 'newChannel',
      messages: [],
    }
  }

  componentDidMount() {
    // NOTE: Data requests should be made only once connection has been established
    client.on('connectionStatusChanged', ({ newValue, oldValue }) => {
      // Check if Connection Status is Connected
      if (newValue === EkoConnectionStatus.Connected) {
        // Establish current user
        const currentUser = client.currentUser;
        // On current user data update, run the following code.
        currentUser.on('dataUpdated', model => {
          // Show current user and display name
          this.setState({ currentUser: model.userId})
          console.log(`Current user: ${model.userId}, Display Name: ${model.displayName}`);
          this.renderMessages()
        });
      }
    })
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
      this.setState({ currentChannel: model.channelId })
      console.log(`Channel joined: ${model.channelId}`);
      this.renderMessages();
    });
  }

  // Render messages in Channel
  renderMessages = () => {
    // Instantiate Message Repository
    const messageRepo = new MessageRepository();
    // Get messages in selected Channel
    const messages = messageRepo.messagesForChannel({ channelId: this.state.currentChannel });

    // Once message data is received, run the following code.
    messages.on('dataUpdated', data => {
      // Empty message state
      this.setState({ messages: [] });
      // Iterate through data array and save message text and user name to local state.
      data.map(message => {
        const newVal = [
          {
            text: message.data.text,
            user: message.userId,
            fresh: true,
          }
        ]
        return this.setState({ messages: newVal.concat(...this.state.messages) })
      })
      // Dispose message listener
      messages.removeAllListeners('dataUpdated');
    })
  }

  // Load more messages
  loadMoreMessages = async () => {
    // Instantiate Message Repository
    const messageRepo = new MessageRepository();
    // Get messages in selected Channel
    const messages = messageRepo.messagesForChannel({ channelId: this.state.currentChannel });
    await new Promise(resolve => messages.once('loadingStatusChanged', resolve));
    if (messages.hasMore) {
      messages.nextPage();
      messages.once('loadingStatusChanged', data => {
        console.log(messages.models)
      });
    }
  }

  // Send message in Channel
  sendMessage = (Message, Channel) => {
    // Instantiate Message Repository
    const messageRepo = new MessageRepository();
    // Send Message
    const messageLiveObject = messageRepo.createTextMessage({
      channelId: Channel,
      text: Message,
    });
    // Store new message as local variable
    const newMessage = {
      text: Message,
      user: this.state.currentUser,
      fresh: false,
    }
    // Post new message locally, set message as not fresh
    this.setState({ messages: [...this.state.messages, newMessage]})
    // On message sent, run the following code.
    messageLiveObject.on('dataStatusChanged', data => {
      console.log(`Message sent`);
      // Once messenge has confirmed sending, change local new message state to fresh
      const newState = this.state.messages.slice()
      newState[newState.indexOf(newMessage)].fresh = true
      this.setState({ messages: newState})
    });
  }

  render() {
    return (
      <div id="container">
        <Header />
        <div className="row">
          <div id="left">
            <ChannelList
              channels={this.state.channels}
              currentChannel={this.state.currentChannel}
              addChannel={this.addChannel}
              existingChannel={this.existingChannel}
              joinChannel={this.joinChannel}
              messages={this.state.messages}
              sendMessage={this.sendMessage}
            />
          </div>
          <div id="right">
            <MessageList
              loadMoreMessages={this.loadMoreMessages}
              messages={this.state.messages}
            />
            <AddMessage
              sendMessage={this.sendMessage}
              currentChannel={this.state.currentChannel}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
