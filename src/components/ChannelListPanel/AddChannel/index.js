import React, { Component } from 'react';

class AddChannel extends Component {
  render() {
    let input;
    const {
      existingChannel,
      demoChannels,
      addChannel,
      joinChannel
    } = this.props
    return (
      <section id="add-channel">
        <input placeholder="Add Channel"
          onKeyPress={e => {
            if (e.key === 'Enter' && input.value !== '') {
              if (!(existingChannel(input.value, demoChannels))) {
                addChannel(input.value)
                joinChannel(input.value)
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
  };
};

export default AddChannel;
