import 'antd/dist/antd.css';

import React, { PureComponent } from 'react';
import EkoClient, {
  MessageRepository,
  ChannelRepository,
  EkoChannelType,
} from 'eko-sdk';

import styled from 'styled-components';
import { message } from 'antd';
import SdkConfig from '../sdk-config';
import ChannelListPanel from './ChannelListPanel';
import MessageList from './MessagesList';
import AddMessage from './MessagesList/AddMessage';
import Header from './Header';

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`;

const Row = styled.div`
  display: flex;
  height: calc(100vh - 50px);
`;

const ChannelList = styled.div`
  width: 280px;
  display: inline-block;
  background-color: #fff;
  border-right: 1px solid #ececec;
  overflow: scroll;
`;

const MessageListPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: calc(100% - 280px);
`;

// Connect to EkoClient with apiKey
const client = new EkoClient({ apiKey: SdkConfig.SAMPLE_APP_KEY });
// Register Session with EkoClient with userId and display name
client.registerSession({
  userId: SdkConfig.DEFAULT_USER.USER_ID,
  displayName: SdkConfig.DEFAULT_USER.DISPLAY_NAME,
});

// Instantiate Channel Repository
const channelRepo = new ChannelRepository();

// Instantiate Message Repository
const messageRepo = new MessageRepository();

// Set up static channels
const staticChanelIdsList = ['newChannel', 'ANDROID', 'public_eko'];

class App extends PureComponent {
  state = {
    displayName: '',
    channels: [],
    currentChannelId: 'newChannel',
  };

  componentDidMount() {
    // Establish current user (only for demo purpose)
    const currentUser = client.currentUser;

    // On current user data update, set current display name
    currentUser.on('dataUpdated', model => this.setState({
      displayName: model.displayName,
    }));

    // Get channel tags for each channel
    staticChanelIdsList.forEach((channelId) => {
      this.addChannel(channelId);
    });
  }

  // Change the display name of current user
  changeDisplayName = displayName => {
    client.setDisplayName(displayName).catch(err => {
      message.error('Display Name Input Error')
    });
    this.setState({
      displayName
    })
  };

  existingChannel = (value, channels) => channels.some(
    channel => channel.channelId.toLowerCase() === value.toLowerCase(),
  );

  // Add channel to local state
  addChannel = (channelId) => {
    const liveChannel = channelRepo.channelForId(channelId);
    // On dataUpdated, retrieve the channels
    liveChannel.on('dataUpdated', data => {
      const channelIndex = this.state.channels.findIndex(
        channel => channel.channelId === data.channelId,
      );
      if (channelIndex === -1) {
        this.setState({
          channels: [...this.state.channels, ...[data]],
        });
      } else {
        this.setState({
          channels: [
            ...this.state.channels.slice(0, channelIndex),
            { ...this.state.channels[channelIndex], ...data },
            ...this.state.channels.slice(channelIndex + 1),
          ],
        });
      }
    });
  };

  // Join selected channel
  joinChannel = (channelId) => {
    // Join channel
    channelRepo.joinChannel({
      channelId,
      type: EkoChannelType.Standard,
    });
    this.setState({
      currentChannelId: channelId,
    });
  };

  // Send message in channel
  sendMessage = (text, channelId) => {
    // Send message
    const messageLiveObject = messageRepo.createTextMessage({
      channelId,
      text,
    });
    // On message sent, run the following code.
    messageLiveObject.on('dataStatusChanged', data => {
      message.success('Message sent')
    });
  };

  render() {
    return (
      <Container>
        <Header
          displayName={this.state.displayName}
          changeDisplayName={this.changeDisplayName}
        />
        <Row>
          <ChannelList>
            <ChannelListPanel
              channels={this.state.channels}
              currentChannelId={this.state.currentChannelId}
              addChannel={this.addChannel}
              existingChannel={this.existingChannel}
              joinChannel={this.joinChannel}
            />
          </ChannelList>
          <MessageListPanel>
            {this.state.currentChannelId && (
              <MessageList
                currentChannelId={this.state.currentChannelId}
              />
            )}
            <AddMessage
              sendMessage={this.sendMessage}
              currentChannelId={this.state.currentChannelId}
            />
          </MessageListPanel>
        </Row>
      </Container>
    );
  }
}

export default App;
