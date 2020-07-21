import styled from 'styled-components';
import { Icon, Input } from 'antd';

export const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 6px 16px 6px 0;

  &.fresh .parent-bubble,
  &.fresh .message-bubble {
    background-color: #e4f8e6;
  }
`;

export const MessageTitle = styled.p`
  color: #555;
  font-size: 15px;
  margin: 0;
`;

export const MessageContent = styled.div`
  display: flex;
  margin: 0.25em 0 0 0.25em;

  .anticon-delete {
    opacity: 1;
  }
  &:hover {
    .anticon-exclamation-circle {
      opacity: 1;
      color: red;
    }
    .anticon-edit {
      opacity: 1;
    }
  }
`;

export const FlagContent = styled.div`
  p {
    margin: 0;
    padding: 5px 12px;
    &:hover {
      cursor: pointer;
      background-color: #e6f7ff;
    }
  }
`;

export const MessageBubble = styled.div`
  display: inline-block;
  min-height: 30px;
  border-radius: 4px;
  padding: 6px 26px 6px 16px;
  position: relative;
  color: #404040;
  border: 1px solid rgb(218, 218, 218);
  background-color: #f1f1f1;
  font-size: 14px;
  word-break: break-all;
  white-space: pre-wrap;
`;

export const StyledIcon = styled(Icon)`
  margin-left: 10px;
  opacity: 0;
  cursor: pointer;
  align-self: center;
`;

export const StyledInput = styled(Input)`
  margin: 0 5px;
  width: 100px;
`;

export const ParentBubble = styled.div`
  border-radius: 4px;
  margin: 0.2em 0 0.4em;
  padding: 0.5em 1em;
  position: relative;
  border: 1px solid rgb(218, 218, 218);
  background-color: inherit;
  font-size: 0.6em;
  word-break: break-all;
  white-space: pre-wrap;
`;
