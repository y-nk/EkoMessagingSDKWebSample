/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

// TODO: enable jsx-a11y rules back and fix issues.

import React, { Component, Fragment } from 'react';
import {
  EkoSyncState,
  MessageRepository,
  UserRepository,
  MessageEditorRepository,
  MessageFlagRepository,
} from 'eko-sdk';
import { message, Popover, Tooltip } from 'antd';
import {
  FlagContent,
  MessageBlock,
  MessageTitle,
  MessageContent,
  MessageBubble,
  StyledIcon,
  StyledInput,
  ParentBubble,
} from './styles';

import ReactionsLister from '../ReactionsLister';
import ReactionsAdder from '../ReactionsAdder';

class Message extends Component {
  constructor(props) {
    super(props);
    const { messageId } = this.props;
    this.messageRepo = new MessageRepository();
    this.userRepo = new UserRepository();
    this.flagRepo = new MessageFlagRepository(messageId);

    this.state = {
      isEditing: false,
      editor: null,
      isFlaggedByMe: undefined,
      parentMessage: null,
    };
  }

  componentDidMount() {
    const { isFlaggedByMeCache, parentId } = this.props;

    if (parentId) {
      const liveParent = this.messageRepo.getMessage(parentId);

      liveParent.on('dataUpdated', parentMessage => {
        this.setState({ parentMessage });
      });

      this.setState({ parentMessage: liveParent.model });
    }

    this.setState({ isFlaggedByMe: isFlaggedByMeCache });
  }

  // Flag message
  flagMessage = messageId => {
    this.flagRepo.flag({ messageId }).then(() => {
      message.info('Message Flagged');
    });
  };

  // Unflag message
  unflagMessage = messageId => {
    this.flagRepo.unflag({ messageId }).then(() => {
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
    this.userRepo.unflag({ userId }).then(() => {
      message.info('User Unflagged');
    });
  };

  renderMessage = () => {
    const { data, type } = this.props;
    switch (type) {
      case 'text':
        return data.text;

      case 'image':
      case 'file':
        return 'Unsupported message format';

      case 'custom':
        return JSON.stringify(data);

      default:
        return 'Unsupported message format';
    }
  };

  toggleEditor = () => {
    const { messageId } = this.props;
    const { isEditing } = this.state;
    const editor = new MessageEditorRepository(messageId);
    if (editor) {
      this.setState({ isEditing: !isEditing, editor });
    }
  };

  editText = text => {
    const { editor, isEditing } = this.state;
    editor
      .editText(text)
      .catch(() => {
        message.error('There was an error processing your request');
      })
      .then(() => this.setState({ isEditing: !isEditing }));
  };

  deleteText = () => {
    const { editor, isEditing } = this.state;
    editor.delete().then(() => this.setState({ isEditing: !isEditing }));
  };

  checkIsFlaggedByMe = async visible => {
    const { isFlaggedByMeCache } = this.props;
    if (visible && isFlaggedByMeCache !== false) {
      const result = await this.flagRepo.isFlaggedByMe();
      this.setState({ isFlaggedByMe: result });
    }
  };

  render() {
    const { user, userId, messageId, syncState, currentUserId, data, setParent } = this.props;

    const { isEditing, isFlaggedByMe, parentMessage } = this.state;
    const userTitle =
      user && user.model
        ? `${user.model.userId}${user.model.displayName ? ` (${user.model.displayName})` : ''}`
        : 'Loading...';

    const content = (
      <FlagContent>
        <p>
          <a onClick={setParent}>Reply</a>
        </p>
        <p>
          {isFlaggedByMe ? (
            <a onClick={() => this.unflagMessage(messageId)}>Unflag Message</a>
          ) : (
            <a onClick={() => this.flagMessage(messageId)}>Flag Message</a>
          )}
        </p>
        <p>
          <a onClick={() => this.flagUser(userId)}>Flag User</a>
        </p>
        <p>
          <a onClick={() => this.unflagUser(userId)}>Unflag User</a>
        </p>
      </FlagContent>
    );

    return (
      <MessageBlock className={syncState === EkoSyncState.Synced ? 'fresh' : ''}>
        <MessageTitle>{userTitle}:</MessageTitle>
        {parentMessage ? (
          <ParentBubble className="parent-bubble">{parentMessage.data.text}</ParentBubble>
        ) : null}
        <MessageContent className="message-content">
          {syncState === 3 ? (
            'Deleted...'
          ) : (
            <MessageBubble className="message-bubble">
              <div>{this.renderMessage()}</div>
              {syncState === EkoSyncState.Synced && <i className="lnr-check" />}
            </MessageBubble>
          )}
          {isEditing && (
            <Fragment>
              <StyledInput
                type="text"
                defaultValue={data.text || ''}
                onPressEnter={e => this.editText(e.target.value)}
              />
              <Tooltip placement="top" title="Delete Message">
                <StyledIcon type="delete" onClick={this.deleteText} theme="filled" />
              </Tooltip>
            </Fragment>
          )}
          {userId === currentUserId && (
            <Tooltip placement="top" title="Edit Message">
              <StyledIcon type="edit" onClick={this.toggleEditor} theme="filled" />
            </Tooltip>
          )}
          <Popover
            content={content}
            placement="right"
            onVisibleChange={this.checkIsFlaggedByMe}
            trigger="click"
          >
            <Tooltip placement="top" title="Action">
              <StyledIcon type="exclamation-circle" theme="filled" />
            </Tooltip>
          </Popover>
        </MessageContent>

        <ReactionsLister target={this.props}>
          <ReactionsAdder target={this.props} />
        </ReactionsLister>
      </MessageBlock>
    );
  }
}

export default Message;
