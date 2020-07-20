import React, { Component } from 'react';

class AddMessage extends Component {
  render() {
    let input;
    const { currentChannelId, sendMessage } = this.props;

    const sendAction = () => {
      sendMessage(input.value, currentChannelId);
      input.selectionStart = 0;
      input.selectionEnd = 0;
      input.value = '';
    };

    return (
      <section id="new-message">
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
      </section>
    );
  }
}

export default AddMessage;
