import React, { Component } from 'react';

class AddChannel extends Component {
  render() {
    let input;
    const { existingChannel, channels, addChannel, joinChannel } = this.props;
    return (
      <section id="add-channel">
        <input
          placeholder="Add Channel"
          onKeyPress={e => {
            if (e.key === 'Enter' && input.value !== '') {
              if (!existingChannel(input.value, channels)) {
                addChannel(input.value);
                joinChannel(input.value);
                input.value = '';
              }
            }
          }}
          type="text"
          ref={node => {
            input = node;
          }}
        />
      </section>
    );
  }
}

export default AddChannel;
