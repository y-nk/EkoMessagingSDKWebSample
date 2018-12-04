import React, { Component } from 'react';
import { EkoSyncState, MessageRepository, UserRepository } from 'eko-sdk';
import { message, Icon, Popover } from 'antd';
import styled from 'styled-components';

const MessageBlock = styled.div`
  padding: 6px 16px 6px 0;
`;

const MessageTitle = styled.p`
  color: #555;
  font-size: 15px;
  margin: 0;
`;

const MessageContent = styled.span``;

const FlagContent = styled.div`
  p {
    margin: 0;
    padding: 5px 12px;
    &:hover {
      cursor: pointer;
      background-color: #e6f7ff;
    }
  }
`;

const MessageBubble = styled.span`
  display: inline-block;
  min-height: 30px;
  border-radius: 4px;
  padding: 6px 26px 6px 16px;
  position: relative;
  margin-top: 4px;
  color: #404040;
  max-width: 60%;
  border: 1px solid rgb(218, 218, 218);
  background-color: #f1f1f1;
  margin-left: 3px;
  font-size: 14px;
`;

const StyledIcon = styled(Icon)`
  margin-left: 10px;
  opacity: 0;
  cursor: pointer;
`;

class Message extends Component {
  constructor(props) {
    super(props);
    this.messageRepo = new MessageRepository();
    this.userRepo = new UserRepository();
  }

  // Flag message
  flagMessage = messageId => {
    this.messageRepo.flag({ messageId });
    message.info('Message Flagged')
  };

  // Unflag message
  unflagMessage = messageId => {
    this.messageRepo.unflag({ messageId });
    message.info('Message Unflagged')
  };

  // Flag user
  flagUser = userId => {
    this.userRepo.flag({ userId });
    message.info('User Flagged')
  };

  // Unflag user
  unflagUser = userId => {
    this.userRepo.flag({ userId });
    message.info('User Unflagged')
  };

  render() {
    const { user, userId, data, messageId, syncState } = this.props;
    const userTitle =
      user && user.model
        ? `${user.model.userId}${
            user.model.displayName ? ` (${user.model.displayName})` : ''
          }`
        : 'Loading...';

    const content = (
      <FlagContent>
        <a onClick={() => this.flagMessage(messageId)}>
          <p>Flag Message</p>
        </a>
        <a onClick={() => this.unflagMessage(messageId)}>
          <p>Unflag Message</p>
        </a>
        <a onClick={() => this.flagUser(userId)}>
          <p>Flag User</p>
        </a>
        <a onClick={() => this.unflagUser(userId)}>
          <p>Unflag User</p>
        </a>
      </FlagContent>
    );
    return (
      <MessageBlock
        className={syncState === EkoSyncState.Synced ? "fresh" : ""}
      >
        <MessageTitle>{userTitle}:</MessageTitle>
        <MessageContent className="message-content">
          {syncState === 3 ? (
            "Deleted..."
          ) : (
            <MessageBubble className="message-bubble">
              {data.text}
              {syncState === EkoSyncState.Synced && <i className="lnr-check" />}
            </MessageBubble>
          )}
          <Popover content={content} placement="right" trigger={["click"]}>
            <StyledIcon type="exclamation-circle" theme="filled" />
          </Popover>
        </MessageContent>
      </MessageBlock>
    );
  }
}

export default Message;
