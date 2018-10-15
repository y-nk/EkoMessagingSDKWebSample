import React from 'react';

const ChannelList = ({ channels, currentChannel, joinChannel }) => {
  const isActive = channelId => {
    if (currentChannel === channelId) {
      return 'active';
    }
  }

  return (
    <ul>
      {channels.map(channelId => (
        <p
          key={channelId}
          onClick={() => joinChannel(channelId)}
          className={isActive(channelId)}
        >
          {channelId}
        </p>
      ))}
    </ul>
  );
};

export default ChannelList;
