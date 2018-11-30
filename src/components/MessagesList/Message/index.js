import React from "react";
import { EkoSyncState } from "eko-sdk";
import { Icon, Popover } from "antd";
import styled from "styled-components";

const MessageBlock = styled.div`
  padding: 6px 16px 6px 0;
`;

const MessageTitle = styled.p`
  color: #555;
  font-size: 15px;
  margin: 0;
`;

const MessageContent = styled.span``;

const FlagContent = styled.div`
  p {
    margin: 0;
    padding: 5px 12px;
    &:hover {
      cursor: pointer;
      background-color: #e6f7ff;
    }
  }
`;

const MessageBubble = styled.span`
  display: inline-block;
  min-height: 30px;
  border-radius: 4px;
  padding: 6px 26px 6px 16px;
  position: relative;
  margin-top: 4px;
  color: #404040;
  max-width: 60%;
  border: 1px solid rgb(218, 218, 218);
  background-color: #f1f1f1;
  margin-left: 3px;
  font-size: 14px;
`;

const StyledIcon = styled(Icon)`
  margin-left: 10px;
  opacity: 0;
  cursor: pointer;
`;

const Message = ({ user, userId, data, messageId, syncState, flagMessage, unflagMessage, flagUser, unflagUser }) => {
  const userTitle =
    user && user.model
      ? `${user.model.userId}${
          user.model.displayName ? ` (${user.model.displayName})` : ""
        }`
      : "Loading...";

  const content = (
    <FlagContent>
      <a onClick={() => flagMessage(messageId)}>
        <p>Flag Message</p>
      </a>
      <a onClick={() => unflagMessage(messageId)}>
        <p>Unflag Message</p>
      </a>
      <a onClick={() => flagUser(userId)}>
        <p>Flag User</p>
      </a>
      <a onClick={() => unflagUser(userId)}>
        <p>Unflag User</p>
      </a>
    </FlagContent>
  );
  return (
    <MessageBlock className={syncState === EkoSyncState.Synced ? "fresh" : ""}>
      <MessageTitle>{userTitle}:</MessageTitle>
      <MessageContent className="message-content">
        {syncState === 3 ? (
          "Deleted..."
        ) : (
          <MessageBubble className="message-bubble">
            {data.text}
            {syncState === EkoSyncState.Synced && <i className="lnr-check" />}
          </MessageBubble>
        )}
        <Popover content={content} placement="right" trigger={["click"]}>
          <StyledIcon type="exclamation-circle" theme="filled" />
        </Popover>
      </MessageContent>
    </MessageBlock>
  );
};

export default Message;
