/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

// TODO: enable jsx-a11y rules back and fix issues.

import React, { Component } from 'react';
import { EkoSyncState, MessageRepository, UserRepository } from 'eko-sdk';
import { message, Popover } from 'antd';
import {
  FlagContent,
  MessageBlock,
  MessageTitle,
  MessageContent,
  MessageBubble,
  StyledIcon,
} from './styles';

class Message extends Component {
  constructor(props) {
    super(props);
    this.messageRepo = new MessageRepository();
    this.userRepo = new UserRepository();
  }

  // Flag message
  flagMessage = messageId => {
    this.messageRepo.flag({ messageId }).then(() => {
      message.info('Message Flagged');
    });
  };

  // Unflag message
  unflagMessage = messageId => {
    this.messageRepo.unflag({ messageId }).then(() => {
      message.info('Message Unflagged');
    });
  };

  // Flag user
  flagUser = userId => {
    this.userRepo.flag({ userId }).then(() => {
      message.info('User Flagged');
    });
  };

  // Unflag user
  unflagUser = userId => {
    this.userRepo.flag({ userId }).then(() => {
      message.info('User Unflagged');
    });
  };

  render() {
    const { user, userId, data, messageId, syncState } = this.props;
    const userTitle =
      user && user.model
        ? `${user.model.userId}${user.model.displayName ? ` (${user.model.displayName})` : ''}`
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
      <MessageBlock className={syncState === EkoSyncState.Synced ? 'fresh' : ''}>
        <MessageTitle>{userTitle}:</MessageTitle>
        <MessageContent className="message-content">
          {syncState === 3 ? (
            'Deleted...'
          ) : (
            <MessageBubble className="message-bubble">
              {data.text}
              {syncState === EkoSyncState.Synced && <i className="lnr-check" />}
            </MessageBubble>
          )}
          <Popover content={content} placement="right" trigger={['click']}>
            <StyledIcon type="exclamation-circle" theme="filled" />
          </Popover>
        </MessageContent>
      </MessageBlock>
    );
  }
}

export default Message;
