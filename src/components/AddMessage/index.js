import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sendMessage } from '../../EkoSDK';

class AddMessage extends Component {
  render() {
    let input;
    return (
      <section id="new-message">
        <input placeholder="Type your message..."
          onKeyPress={e => {
            if (e.key === 'Enter' && input.value !== '') {
              this.props.addMessage(input.value, this.props.user[0].name);
              sendMessage(input.value, this.props.currentChannel);
              input.value = '';
            }
          }}
          type="text"
          ref={node => {
            input = node;
          }}
        />
        <button type="submit" onClick={() => {
          if (input.value !== '') {
            this.props.addMessage(input.value, this.props.user[0].name);
            sendMessage(input.value, this.props.currentChannel);
            input.value = '';
          }
        }
        } className="send-button">Send</button>
      </section>
    );
  };
};

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired,
};

export default AddMessage;
