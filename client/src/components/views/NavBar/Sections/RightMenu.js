/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { USER_SERVER } from '../../../Config';

function RightMenu(props) {
  const { mode, history } = props;
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        history.push('/login');
      } else {
        // eslint-disable-next-line no-alert
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Menu mode={mode}>
      <Menu.Item key="logout">
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(RightMenu);
