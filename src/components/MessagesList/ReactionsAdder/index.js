/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */

// TODO: enable jsx-a11y rules back and fix issues.

import React, { Component } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import REACTIONS from '../../../reactions.json';

import ReactionButton from '../ReactionButton';

import { StyledReactionsAdder, StyledReactionButton, StyledReactionDrawer } from './styles';

class ReactionsAdder extends Component {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false };
  }

  togglePopup() {
    const { popupVisible } = this.state;
    this.setState({ popupVisible: !popupVisible });
  }

  render() {
    const { target } = this.props;
    const { popupVisible } = this.state;

    return (
      <StyledReactionsAdder className="reactions-adder">
        <StyledReactionButton onClick={() => this.togglePopup()}>
          <SmileOutlined />
        </StyledReactionButton>

        {popupVisible ? (
          <StyledReactionDrawer>
            {Object.keys(REACTIONS).map(k => (
              <ReactionButton
                key={k}
                target={target}
                reactionName={k}
                onClick={() => this.togglePopup()}
              />
            ))}
          </StyledReactionDrawer>
        ) : null}
      </StyledReactionsAdder>
    );
  }
}

export default ReactionsAdder;
