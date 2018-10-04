import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { messageRepo } from '../../EkoSDK';

class AddMessage extends Component {
  sendMessage = (Message, Channel) => {
    const messageLiveObject = messageRepo.createTextMessage({
      channelId: Channel,
      text: Message,
    });

    messageLiveObject.on('dataStatusChanged', data => {
      console.log(`Message sent`);
      this.props.addMessage(Message, this.props.user[0].name);
    });
  }
  updateMessages = (Value) => {
    const messages = messageRepo.messagesForChannel({ channelId: Value });
    messages.on('dataUpdated', data => {
      console.log(data)
      data.map(message =>
        this.props.loadMessage(message.data.text, message.userId)
      );
      messages.removeAllListeners('dataUpdated');
    });
  }
  render() {
    let input;
    return (
      <section id="new-message">
        <input placeholder="Type your message..."
          onKeyPress={e => {
            if (e.key === 'Enter' && input.value !== '') {
              this.sendMessage(input.value, this.props.currentChannel);
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
            this.sendMessage(input.value, this.props.currentChannel);
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
