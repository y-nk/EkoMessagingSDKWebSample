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
    const { shouldShowUserDisplayNameInput } = this.state;
    this.setState({
      shouldShowUserDisplayNameInput: !shouldShowUserDisplayNameInput,
    });
  };

  handleChangeUser = e => {
    if (!e) return;
    const { changeUser } = this.props;
    const { key: userId } = e;
    changeUser(userId, `${userId}_name`);
  };

  handleDisplayNameChange = e => {
    return this.setState({
      displayNameInput: e.target.value,
    });
  };

  render() {
    const { displayName, changeDisplayName } = this.props;
    const { shouldShowUserDisplayNameInput, displayNameInput } = this.state;
    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.handleInput()}>Change Display Name</Menu.Item>
        <Menu.Divider />
        <Menu.SubMenu title="Change User" onClick={this.handleChangeUser}>
          <Menu.Item key="web_switch_user_1">web_switch_user_1_name</Menu.Item>
          <Menu.Item key="web_switch_user_2">web_switch_user_2_name</Menu.Item>
          <Menu.Item key="web_switch_user_3">web_switch_user_3_name</Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.Item disabled>Version {version}</Menu.Item>
      </Menu>
    );

    return (
      <HeaderContainer>
        <Title>
          <h1>eko-sdk Sample App</h1>
        </Title>
        <DisplayName>
          <span>
            {shouldShowUserDisplayNameInput ? (
              <Input
                type="text"
                value={displayNameInput}
                onChange={this.handleDisplayNameChange}
                onPressEnter={() => {
                  changeDisplayName(displayNameInput);
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
