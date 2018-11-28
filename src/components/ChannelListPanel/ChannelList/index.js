import React from "react";
import { Tag } from "antd";
import styled from "styled-components";

const Channel = styled.div`
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  margin: 0;
`;

const ChannelInfo = styled.div`
  padding: 15px 15px 15px 23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    font-size: 16px;
    margin: 0;
  }
`;

const ChannelTags = styled.div`
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-columns: auto;
`;

const StyledTag = styled(Tag)`
  align-self: center;
  font-size: 9px;
  border: none;
  margin-right: 3px;
  margin-bottom: 3px;
`;

const MemberCount = styled.p`
  margin: 0;
  padding: 10px 0;
  font-size: 12px;
`;

const ChannelList = ({ channels, currentChannelId, joinChannel }) => {
  const isActive = channelId => {
    if (currentChannelId === channelId) {
      return "active";
    }
    return "inactive";
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
              {channel.tags &&
                channel.tags.map((tag, index) => (
                  <StyledTag key={index}>{tag}</StyledTag>
                ))}
            </ChannelTags>
          </ChannelInfo>
        </Channel>
      ))}
    </ul>
  );
};

export default ChannelList;
