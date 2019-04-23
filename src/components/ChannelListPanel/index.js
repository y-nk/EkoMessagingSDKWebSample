import React from 'react';
import styled from 'styled-components';
import AddChannel from './AddChannel';
import ChannelList from './ChannelList';

const ChannelPanel = styled.div`
  padding: 0;
  margin: 0;
`;

function ChannelListPanel({
  channels,
  joinChannel,
  addChannel,
  existingChannel,
  currentChannelId,
}) {
  return (
    <ChannelPanel>
      <AddChannel
        channels={channels}
        joinChannel={joinChannel}
        addChannel={addChannel}
        existingChannel={existingChannel}
      />
      <ChannelList
        channels={channels}
        joinChannel={joinChannel}
        currentChannelId={currentChannelId}
      />
    </ChannelPanel>
  );
}

export default ChannelListPanel;
