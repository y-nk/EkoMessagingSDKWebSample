import React, { Component } from 'react';

class AddChannel extends Component {

    render() {
        let input;
        return (
            <section id="add-channel">
                <input placeholder="Add Channel"
                    onKeyPress={e => {
                        if (e.key === 'Enter' && input.value !== '') {
                            if (!(this.props.existingChannel(input.value, this.props.channels))) {
                                this.props.addChannel(input.value)
                                this.props.joinChannel(input.value)
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