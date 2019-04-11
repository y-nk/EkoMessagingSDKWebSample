import React, { Component } from 'react';
import { Menu, Input } from 'antd';
import { HeaderContainer, Title, Setting, DisplayName, StyledIcon } from './styles';
import { version } from '../../../package.json';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNameInput: '',
      shouldShowUserDisplayNameInput: false,
    };
  }

  handleInput = () => {
    return this.setState({
      shouldShowUserDisplayNameInput: !this.state.shouldShowUserDisplayNameInput,
    });
  };

  handleDisplayNameChange = e => {
    return this.setState({
      displayNameInput: e.target.value,
    });
  };

  render() {
    const { displayName, changeDisplayName } = this.props;
    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.handleInput()}>Change Display Name</Menu.Item>
        <Menu.Divider />
        <Menu.Item disabled>
          Version
          {version}
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderContainer>
        <Title>
          <h1>eko-sdk Sample App</h1>
        </Title>
        <DisplayName>
          <span>
            {this.state.shouldShowUserDisplayNameInput ? (
              <Input
                type="text"
                value={this.state.displayNameInput}
                onChange={this.handleDisplayNameChange}
                onPressEnter={() => {
                  changeDisplayName(this.state.displayNameInput);
                  this.handleInput();
                }}
              />
            ) : (
              displayName
            )}
          </span>
          <Setting overlay={menu} placement="bottomRight" trigger={['click']}>
            <StyledIcon type="setting" />
          </Setting>
        </DisplayName>
      </HeaderContainer>
    );
  }
}

export default Header;
