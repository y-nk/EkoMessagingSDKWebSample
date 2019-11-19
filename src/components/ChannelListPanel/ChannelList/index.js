import React from 'react';
import { Channel, ChannelInfo, ChannelTags, MemberCount, StyledTag } from './styles';

const ChannelList = ({ channels, currentChannelId, joinChannel }) => {
  const isActive = channelId => {
    if (currentChannelId === channelId) {
      return 'active';
    }
    return 'inactive';
  };

  return (
    <ul>
      {channels.map(channel => (
        <Channel
          className={`channel-tab ${isActive(channel.channelId)}`}
          key={channel.channelId}
          onClick={() => joinChannel(channel.channelId)}
        >
          <ChannelInfo>
            <h3>{channel.channelId}</h3>
            <MemberCount>
              Member count: <b>{channel.memberCount}</b>
            </MemberCount>
            <ChannelTags>
              {channel.tags && channel.tags.map(tag => <StyledTag key={tag}>{tag}</StyledTag>)}
            </ChannelTags>
          </ChannelInfo>
        </Channel>
      ))}
    </ul>
  );
};

export default ChannelList;
