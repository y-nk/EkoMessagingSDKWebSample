import React, { Component } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { MessageBar, ThreadBubble, CancelButton } from './styles';

class AddMessage extends Component {
  render() {
    let input;
    const { currentChannelId, sendMessage, parentMessage, unsetParent } = this.props;

    const sendAction = () => {
      sendMessage(input.value, currentChannelId);
      input.selectionStart = 0;
      input.selectionEnd = 0;
      input.value = '';
    };

    return (
      <MessageBar id="new-message">
        {parentMessage ? (
          <ThreadBubble>
            {parentMessage.data.text}
            <CancelButton type="button" onClick={unsetParent}>
              <CloseOutlined />
            </CancelButton>
          </ThreadBubble>
        ) : null}
        <form onSubmit={e => e.preventDefault()}>
          <textarea
            placeholder="Type your message..."
            rows="1"
            onKeyUp={e => {
              if (e.key === 'Enter' && !e.shiftKey && input.value !== '') {
                sendAction();
              }
            }}
            ref={node => {
              input = node;
            }}
          />
          <button
            type="submit"
            onClick={() => {
              if (input.value !== '') {
                sendAction();
              }
            }}
            className="send-button"
          >
            Send
          </button>
        </form>
      </MessageBar>
    );
  }
}

export default AddMessage;
