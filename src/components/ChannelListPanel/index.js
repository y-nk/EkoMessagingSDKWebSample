import React from 'react';
import AddChannel from './AddChannel';
import ChannelList from './ChannelList';


const ChannelListPanel = props => (
  <div id="channels">
    <AddChannel
      channels={props.channels}
      joinChannel={props.joinChannel}
      addChannel={props.addChannel}
      existingChannel={props.existingChannel}
    />
    <ChannelList
      channels={props.channels}
      joinChannel={props.joinChannel}
      currentChannelId={props.currentChannelId}
    />
  </div>
);

export default ChannelListPanel;
