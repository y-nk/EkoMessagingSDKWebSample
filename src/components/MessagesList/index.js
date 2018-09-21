import React, { Component } from 'react'
import Message from './Message'
import InfiniteScroll from 'react-infinite-scroll-component';
import { messageRepo } from '../../EkoSDK';

class MessagesList extends Component {
  onScrollToBottom = async () => {
    const messages = messageRepo.messagesForChannel({ channelId: this.props.currentChannel });
    await new Promise(resolve => messages.once('loadingStatusChanged', resolve));
    if (messages.hasMore) {
      messages.nextPage();
      messages.once('loadingStatusChanged', () => {
        const newMessage = messages.models
        newMessage.map(message => 
          this.props.loadMessage(message.data.text, message.userId)
        );
      });
    }
  }

  channelHasMore = () => {
    const messages = messageRepo.messagesForChannel({ channelId: this.props.currentChannel });
    if (messages.hasMore) {
      return true
    }
    return false
  }
  
  render() {

    return (
      <InfiniteScroll
        dataLength={this.props.messages.length}
        height={500}
        next={this.onScrollToBottom}
        hasMore={false}
      >
        <ul id="message-list">
          {this.props.messages.map(message =>
            <Message
              key={message.id}
              {...message}
            />
          )}
        </ul>
      </InfiniteScroll>
    );
  };
};

export default MessagesList