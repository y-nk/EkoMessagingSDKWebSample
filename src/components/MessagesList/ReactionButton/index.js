import React, { Component } from 'react';
import styled from 'styled-components';

import { ReactorRepository } from 'eko-sdk';
import REACTIONS from '../../../reactions.json';

export const StyledReaction = styled.button`
  display: inline-flex;
  align-items: center;
  margin: 0 0.25em 0.25em 0;
  padding: 0 0.5em;
  border: 1px solid #dfdfdf;
  border-radius: 1em;
  background: transparent;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #f0f0f0;
  }

  & > span {
    margin-left: 0.4em;
    padding-top: 0.2em;
    font-size: 0.8em;
    color: currentColor;
  }

  &.selected {
    background: rgba(24, 144, 255, 0.2);
    border: 1px solid currentColor;
    color: #1890ff;
  }
`;

export default class ReactionButton extends Component {
  constructor(props) {
    super(props);
    this.reactorRepo = new ReactorRepository(props.target);
  }

  toggleReaction() {
    const { reactionName, target, onClick } = this.props;
    const { myReactions } = target;

    if (!myReactions.includes(reactionName)) {
      this.reactorRepo.addReaction(reactionName);
    } else {
      this.reactorRepo.removeReaction(reactionName);
    }

    if (onClick) onClick();
  }

  render() {
    const { className, reactionName, reactionCount } = this.props;
    const reactionIcon = REACTIONS[reactionName] || reactionName;

    return (
      <StyledReaction className={className} onClick={() => this.toggleReaction()}>
        {reactionIcon} {reactionCount > 0 ? <span>{reactionCount}</span> : null}
      </StyledReaction>
    );
  }
}
