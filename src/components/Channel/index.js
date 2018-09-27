import React, { Component } from 'react';
import { AddChannel } from '../../containers/AddChannel';
import { joinChannel, messageRepo } from '../../EkoSDK';

class Channel extends Component {
    updateMessages = (Value) => {
        const messages = messageRepo.messagesForChannel({ channelId: Value });
        messages.once('dataUpdated', data => {
            data.map(message =>
                this.props.loadMessage(message.data.text, message.userId)
            );
            messages.removeAllListeners('dataUpdated');
        });
    }

    isActive = (channel) => {
        if (this.props.currentChannel === channel) {
            return 'active';
        }
    }

    render() {
        return (
            <div id="channels">
                <AddChannel />
                <ul>
                    {this.props.channel.map(data =>
                        <p key={data.id}
                        onClick={() => {
                            this.props.unloadMessage();
                            this.props.setCurrentChannel(data.channel);
                            joinChannel(data.channel);
                            this.updateMessages(data.channel)
                        }}
                        className={this.isActive(data.channel)}
                        >{data.channel}</p>
                    )}
                </ul>
            </div>
        );
    }
}

export default Channel