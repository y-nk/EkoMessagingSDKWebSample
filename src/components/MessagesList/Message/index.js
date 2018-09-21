import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div id="message">
        <span className="title">{this.props.author}:</span> 
        <p><span className="message-bubble">{this.props.message}</span></p>
      </div>
    );
  };
};

export default Message;