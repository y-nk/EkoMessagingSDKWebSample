import React, { Component } from 'react';
import AddChannel from './AddChannel';
import Channel from './Channel';


class ChannelList extends Component {

    render() {
        return (
            <div id="channels">
                <AddChannel
                    channels={this.props.channels}
                    addChannel={this.props.addChannel}
                    existingChannel={this.props.existingChannel}
                    joinChannel={this.props.joinChannel}
                />
                <Channel
                    currentChannel={this.props.currentChannel}
                    channels={this.props.channels}
                    joinChannel={this.props.joinChannel}
                />
            </div>
        );
    }
}

export default ChannelList