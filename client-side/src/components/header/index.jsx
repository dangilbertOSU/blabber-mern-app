import Button from '../button/index';
import React from 'react';

const Header = (props) => {
  return (
      <div className="GlobalHeader">
        <div className="GlobalHeader_Left GlobalHeader_List">
          <ul className="GlobalHeader_Titles">
            <li><Button variant="plain" href="/">Blabber.</Button></li>
          </ul>
        </div>
        <div className="GlobalHeader_Right GlobalHeader_List">
          <ul>
            <li><Button variant="secondary" href="/login">log out</Button></li>
          </ul>
        </div>
      </div>
  );
};

export default Header;
