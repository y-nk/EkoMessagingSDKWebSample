import React, { Component } from 'react';
import { Icon, Dropdown, Menu, Input } from 'antd';
import styled from 'styled-components';

import { version } from '../../../package.json';

const HeaderContainer = styled.div`
  height: 50px;
  background: #28cb72;
  border-bottom: 1px solid #d4dadf;
  box-shadow: 0 1px 1px 0 rgba(116, 129, 141, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Title = styled.div`
  padding-left: 30px;
  h1 {
    font-size: 18px;
    color: white;
    margin: 0;
  }
`;

const Setting = styled(Dropdown)`
  display: inline-block;
  padding: 10px 15px;
  margin-left: 15px;
  height: 100%;
  border-left: 1px solid white;
  display: flex;
  align-items: center;
  color: white;
`;

const DisplayName = styled.div`
  span {
    font-size: 16px;
  }
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  font-size: 20px;
  cursor: pointer;
`;

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayNameInput: '',
      shouldShowUserDisplayNameInput: false,
    }
  }

  handleInput = () => this.setState({
    shouldShowUserDisplayNameInput: !this.state.shouldShowUserDisplayNameInput,
  });

  handleDisplayNameChange = e => this.setState({
    displayNameInput: e.target.value,
  });

  render() {
    const {
      displayName,
      changeDisplayName,
    } = this.props;
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
                  changeDisplayName(this.state.displayNameInput)
                  this.handleInput()
                  }}
              />
            ) : (
              displayName
            )}
          </span>
          <Setting overlay={menu} placement="bottomRight" trigger={["click"]}>
            <StyledIcon type="setting" />
          </Setting>
        </DisplayName>
      </HeaderContainer>
    );
  }
}

export default Header;
