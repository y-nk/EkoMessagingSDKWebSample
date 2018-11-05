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
          className={`channel-tab ${isActive(channel.id)}`}
          key={channel.id}
          onClick={() => joinChannel(channel.id)}
        >
          <p>{channel.id}</p>
          {channel.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      ))}
    </ul>
  );
};

export default ChannelList;
