import Button from '../button/index';
import React from 'react';

import './header.css';

const Header = (props) => {

  const LogoutButton = <Button variant="secondary" href="/login">log out</Button>;
  /* const LoginButton = <Button variant="secondary" href="/login">log in</Button>; */

  return (
      <div className="header">
        <div className="header_left header_list">
          <ul className="header_titles">
            <li><Button  className="header_logo" variant="plain" href="/">blabber.</Button></li>
          </ul>
        </div>
        <div className="header_right header_list">
          <ul>
            <li>{LogoutButton}</li>
          </ul>
        </div>
      </div>
  );
};

export default Header;
