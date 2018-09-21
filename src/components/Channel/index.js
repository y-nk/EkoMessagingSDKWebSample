import React, { Component } from 'react';
import { joinChannel, messageRepo } from '../../EkoSDK';

class Channel extends Component {
    updateMessages = (Value) => {
        const messages = messageRepo.messagesForChannel({ channelId: Value });
        messages.on('dataUpdated', data => {
            data.map(message =>
                this.props.loadMessage(message.data.text, message.userId)
            );
            messages.removeAllListeners('dataUpdated');
        });
    }

    render() {
        return (
            <div id="channels">
                <ul>
                    {this.props.channel.map(data =>
                        <p key={data.id}
                        onClick={() => {
                            this.props.unloadMessage();
                            this.props.setCurrentChannel(data.channel);
                            joinChannel(data.channel);
                            this.updateMessages(data.channel)
                        }}
                        >{data.channel}</p>
                    )}
                </ul>
            </div>
        );
    }
}

export default Channel