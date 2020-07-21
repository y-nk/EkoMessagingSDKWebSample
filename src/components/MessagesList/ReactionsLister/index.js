/* eslint-disable */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

// TODO: enable jsx-a11y rules back and fix issues.

import React, { Component } from 'react';
// import { MessageRepository } from 'eko-sdk';
import REACTIONS from '../../../reactions.json';

import ReactionButton from '../ReactionButton';

import {
  StyledReactionsLister,
} from './styles';

class ReactionsLister extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { target, children } = this.props;
    const { reactions, myReactions } = target;

    return (
      <StyledReactionsLister>
        { Object.entries(reactions).map(([k, v]) => (
          <ReactionButton
            key={k}
            className={myReactions.includes(k) ? "selected" : ""}
            target={target}
            reactionName={k}
            reactionCount={v}
          />
        )) }
        { children }
      </StyledReactionsLister>
    );
  }
}

export default ReactionsLister;
