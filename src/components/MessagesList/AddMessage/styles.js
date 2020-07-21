import styled from 'styled-components';

export const MessageBar = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
`;

export const ThreadBubble = styled.div`
  position: relative;
  border-radius: 4px;
  padding: 0.5em 3em 0.5em 0.5em;
  position: relative;
  color: #404040;
  border: 1px solid rgb(218, 218, 218);
  background-color: #e4f8e6;
  margin: 3px;
  font-size: 0.8em;
  word-break: break-all;
  white-space: pre-wrap;
`;

export const CancelButton = styled.button`
  position: absolute;
  right: 3px;
  top: 3px;
  padding: 0.3em 0.4em 0.2em;
  border: 1px solid rgb(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.5);
  font-size: 0.8em;
  border-radius: 0.25em;
  cursor: pointer;
`;
