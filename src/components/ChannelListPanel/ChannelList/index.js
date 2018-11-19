import React from 'react';
import { Tag } from 'antd';


const ChannelList = ({ channels, currentChannelId, joinChannel }) => {
  const isActive = channelId => {
    if (currentChannelId === channelId) {
      return 'active';
    }
  }

  return (
    <ul>
      {channels.map(channel => (
        <div
          className={`channel-tab ${isActive(channel.channelId)}`}
          key={channel.channelId}
          onClick={() => joinChannel(channel.channelId)}
        >
          <p>{channel.channelId}</p>
          {channel.tags && channel.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
          <p className="member-count">Member count: <b>{channel.memberCount}</b></p>
        </div>
      ))}
    </ul>
  );
};

export default ChannelList;
