import React, { useState } from 'react';
import { Menu, Dropdown, Avatar, Popover } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";
import Login from './Login';


const UserAction = ({ logged, setLogged }) => {
  const [beforeLog, AfterLog] = useState({
    visible: false,
  });

  const hide = () => {
    AfterLog({
      visible: false,
    });
  };

  const handleVisibleChange = visible => {
    AfterLog({ visible: visible });
  };
  const handleClick = e => {
    let {REACT_APP_DOMAIN: domain, REACT_APP_LOGIN_PORT : port} = process.env;
    axios.post('https://agrix-api.herokuapp.com/server/api/user/logout').then(() =>{
      setLogged(false);
    });
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/analysis">Analysis</Link>
      </Menu.Item>
      <Menu.Item onClick={handleClick}>
        <Link>Logout</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    logged ?
      <Dropdown overlay={menu} placement="bottomRight">
        <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
      </Dropdown> : <Popover
        placement="bottomRight"
        content={<Login hide={hide} setLogged={setLogged}/>}
        trigger="click"
        visible={beforeLog.visible}
        onVisibleChange={handleVisibleChange}
      >
        <Avatar style={{ backgroundColor: '#f56a00' }} icon="login" />
      </Popover>
  );
}

export default UserAction;
