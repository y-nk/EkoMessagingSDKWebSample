import 'antd/dist/antd.css';

import React, { PureComponent } from 'react';
import EkoClient, {
  MessageRepository,
  ChannelRepository,
  ChannelMembershipRepository,
  EkoChannelType,
  EkoConnectionStatus,
} from 'eko-sdk';

import { message } from 'antd';
import { Container, Row, ChannelList, MessageListPanel } from './styles';
import SdkConfig from '../sdk-config';
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

// Instantiate Channel Repository
const channelRepo = new ChannelRepository();

// Instantiate Message Repository
const messageRepo = new MessageRepository();

class App extends PureComponent {
  state = {
    userId: '',
    displayName: '',
    channels: [],
    currentChannelId: '',
    channelMembership: null,
  };

  componentDidMount() {
    // Establish current user (only for demo purpose)
    const { currentUser } = client;

    // On current user data update, set current display name
    currentUser.on('dataUpdated', model =>
      this.setState({ userId: model.userId, displayName: model.displayName }),
    );

    // Get all channels that user is a member of
    const channels = channelRepo.allChannels();

    // Add all channels to the channel list
    channels.on('dataUpdated', models => {
      models.forEach(channel => {
        this.addChannel(channel.channelId);
      });
    });
  }

  changeUser = (newUserId, newDisplayName = '') => {
    if (!newUserId) return;

    const { currentChannelId } = this.state;
    const bufferForChannelId = currentChannelId;
    this.setState({ currentChannelId: null });

    client.on('connectionStatusChanged', ({ newValue }) => {
      if (newValue === EkoConnectionStatus.Connected) {
        const { currentUser } = client;

        // On current user data update, set current display name
        currentUser.on('dataUpdated', model => {
          this.setState({ displayName: model.displayName });
        });

        this.setState({ currentChannelId: bufferForChannelId });
        client.removeAllListeners('connectionStatusChanged');
      }
    });

    client.unregisterSession();

    client.registerSession({ userId: newUserId, displayName: newDisplayName });
  };

  // Change the display name of current user
  changeDisplayName = displayName => {
    client.setDisplayName(displayName).catch(() => {
      message.error('Display Name Input Error');
    });
    this.setState({
      displayName,
    });
  };

  existingChannel = (value, channels) =>
    channels.some(channel => channel.channelId.toLowerCase() === value.toLowerCase());

  // Add channel to local state
  addChannel = channelId => {
    const liveChannel = channelRepo.channelForId(channelId);
    // On dataUpdated, retrieve the channels
    liveChannel.on('dataUpdated', data => {
      const { channels } = this.state;
      const channelIndex = channels.findIndex(channel => channel.channelId === data.channelId);
      if (channelIndex === -1) {
        this.setState({
          channels: [...channels, ...[data]],
        });
      } else {
        this.setState({
          channels: [
            ...channels.slice(0, channelIndex),
            { ...channels[channelIndex], ...data },
            ...channels.slice(channelIndex + 1),
          ],
        });
      }
    });
  };

  // Join selected channel
  joinChannel = channelId => {
    // If already member of channel, stop reading that channel first
    const { channelMembership } = this.state;
    if (channelMembership) {
      channelMembership.stopReading();
    }

    // Join channel
    channelRepo.joinChannel({
      channelId,
      type: EkoChannelType.Standard,
    });

    // Join the channel membership
    const channelMembershipRepo = new ChannelMembershipRepository(channelId);

    // Start reading channel membership
    channelMembershipRepo.startReading();

    this.setState({
      currentChannelId: channelId,
      channelMembership: channelMembershipRepo,
    });
  };

  // Leave selected channel
  leaveChannel = () => {
    const { channelMembership } = this.state;

    if (channelMembership) {
      // Stop reading channel membership
      channelMembership.stopReading();
      channelMembership.leave().then(() => {
        this.setState({ currentChannelId: '' });
      });
    }
  };

  // Send message in channel
  sendMessage = (text, channelId) => {
    // Send message
    const messageLiveObject = messageRepo.createTextMessage({
      channelId,
      text,
    });
    // On message sent, run the following code.
    messageLiveObject.on('dataStatusChanged', () => {
      message.success('Message sent');
    });
  };

  render() {
    const { displayName, currentChannelId, channels, userId } = this.state;
    return (
      <Container>
        <Header
          displayName={displayName}
          changeDisplayName={this.changeDisplayName}
          changeUser={this.changeUser}
        />
        <Row>
          <ChannelList>
            <ChannelListPanel
              channels={channels}
              currentChannelId={currentChannelId}
              addChannel={this.addChannel}
              joinChannel={this.joinChannel}
              leaveChannel={this.leaveChannel}
              existingChannel={this.existingChannel}
            />
          </ChannelList>
          <MessageListPanel>
            {currentChannelId && (
              <MessageList currentUserId={userId} currentChannelId={currentChannelId} />
            )}
            <AddMessage sendMessage={this.sendMessage} currentChannelId={currentChannelId} />
          </MessageListPanel>
        </Row>
      </Container>
    );
  }
}

export default App;
