import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div id="message" className={this.props.fresh ? 'fresh' : ''}>
        <span className="title">{this.props.user}:</span>
        <p><span className="message-bubble">{this.props.text}
        {this.props.fresh ?
          <i className="lnr-check"></i>
          :
          ''
        }</span></p>
      </div>
    );
  };
};

export default Message;