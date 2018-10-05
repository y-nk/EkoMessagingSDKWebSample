import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div id="message" className={this.props.fresh ? 'fresh' : ''}>
        <span className="title">{this.props.author}:</span>
        <p><span className="message-bubble">{this.props.message}
        {this.props.fresh ?
          <i className="lnr-check"></i>
          :
          ''
        }
        </span></p>
        
      </div>
    );
  };
};

export default Message;