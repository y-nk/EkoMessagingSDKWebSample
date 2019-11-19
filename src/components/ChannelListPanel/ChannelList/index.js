import React from 'react';
import { Channel, ChannelInfo, ChannelTags, MemberCount, StyledTag, StyledIcon } from './styles';

const ChannelList = ({ channels, currentChannelId, joinChannel, leaveChannel }) => {
  return (
    <ul>
      {channels.map(channel => (
        <Channel
          className={`channel-tab ${
            currentChannelId === channel.channelId ? 'active' : 'inactive'
          }`}
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
          <StyledIcon type="logout" onClick={() => leaveChannel(channel.channelId)} />
        </Channel>
      ))}
    </ul>
  );
};

export default ChannelList;
