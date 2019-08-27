import Button from '../button/index';
import React, { useEffect, useState } from 'react';

import './header.css';

const Header = (props) => {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(props.user);
  }, [props.user]);

  const LogoutButton = <Button variant="secondary" href="/logout">logout</Button>;
  const LoginButton = <Button variant="secondary" href="/login">login</Button>;

  return (
      <div className="header">
        <div className="header_left header_list">
          <ul className="header_titles">
            <li><Button  className="header_logo" variant="plain" href="/">blabber.</Button></li>
          </ul>
        </div>
        <div className="header_right header_list">
          <ul>
            <li>{currentUser ? LogoutButton : LoginButton }</li>
          </ul>
        </div>
      </div>
  );
};

export default Header;
