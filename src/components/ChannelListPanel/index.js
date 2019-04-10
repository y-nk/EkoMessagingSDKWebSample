import React from 'react';
import styled from 'styled-components';
import AddChannel from './AddChannel';
import ChannelList from './ChannelList';

const ChannelPanel = styled.div`
  padding: 0;
  margin: 0;
`;

const ChannelListPanel = props => (
  <ChannelPanel>
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
  </ChannelPanel>
);

export default ChannelListPanel;
