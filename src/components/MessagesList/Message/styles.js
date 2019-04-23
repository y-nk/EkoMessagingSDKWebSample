import styled from 'styled-components';
import { Icon } from 'antd';

export const MessageBlock = styled.div`
  padding: 6px 16px 6px 0;
`;

export const MessageTitle = styled.p`
  color: #555;
  font-size: 15px;
  margin: 0;
`;

export const MessageContent = styled.span``;

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

export const MessageBubble = styled.span`
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

export const StyledIcon = styled(Icon)`
  margin-left: 10px;
  opacity: 0;
  cursor: pointer;
`;
