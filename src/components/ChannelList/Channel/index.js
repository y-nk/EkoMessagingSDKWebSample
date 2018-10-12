import React, { Component } from 'react';

class Channel extends Component {
  isActive = (channel) => {
    if (this.props.currentChannel === channel) {
      return 'active';
    }
  }
  render() {
    return (
      <ul>
        {this.props.channels.map(channel =>
          <p
            key={this.props.channels.indexOf(channel)}
            onClick={() =>
              this.props.joinChannel(channel)}
            className={this.isActive(channel)}
          >{channel}</p>
        )}
      </ul>
    );
  };
};

export default Channel;