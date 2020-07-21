import styled from 'styled-components';

export const StyledReactionsAdder = styled.div`
  position: relative;
`;

export const StyledReactionButton = styled.button`
  display: inline-block;
  margin: 0.25em 0;
  padding: 0 0.5em;
  border: 1px solid #dfdfdf;
  border-radius: 1em;
  background: transparent;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #f0f0f0;
  }
`;

export const StyledReactionDrawer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: auto;
  z-index: 2;
  width: 15em;
  max-height: 15em;
  padding: 0.25em;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.1);
`;

export const StyledReaction = styled.button`
  display: inline-block;
  margin: 0.25em;
  padding: 0 0.5em;
  border: 1px solid #dfdfdf;
  border-radius: 1em;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;
