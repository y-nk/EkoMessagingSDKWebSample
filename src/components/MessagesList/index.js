import React, { Component } from 'react'
import Message from './Message'
import InfiniteScroll from 'react-infinite-scroll-component';

class MessagesList extends Component {
  render() {
    return (
      <InfiniteScroll
        dataLength={this.props.messages.length}
        height={500}
        next={this.props.loadMoreMessages}
        hasMore={false}
      >
        <ul id="message-list">
          {this.props.messages.map(message =>
            <Message
              key={this.props.messages.indexOf(message)}
              {...message}
            />
          )}
        </ul>
      </InfiniteScroll>
    );
  };
};

export default MessagesList