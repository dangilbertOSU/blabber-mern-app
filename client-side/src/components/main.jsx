import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import EntriesList from './entries-feed';
import Login from './loginsystem/login';

// import { ReactComponent as UploadPhotoIcon } from '../svg-files/upload-photo.svg'
// import { ReactComponent as LargeGear } from '../svg-files/settings-gear-large.svg'
// import { ReactComponent as SmallGear } from '../svg-files/settings-gear-small.svg'

import { Controller, Scene } from 'react-scrollmagic';

function Main() {

  const [login, setLogin] = useState(false)

  return (
    <Router>
      <Controller>
        <Scene classToggle="Header_Animation" triggerElement="#dummy" offset={50}>
        <div className="GlobalHeader">
          <div className="GlobalHeader_Left GlobalHeader_List">
            <ul className="GlobalHeader_Titles">
              <li><Link to="/" className="GlobalHeader_Logo">blabber.</Link></li>
            </ul>
          </div>
          <div className="GlobalHeader_Right GlobalHeader_List">
            <ul className="GlobalHeader_Titles">
              {login ? <li><button className="SecondaryButton" onClick={() => setLogin(false)}>logout</button></li> : null}
            </ul>
          </div>
        </div>
        </Scene>
      </Controller>
      <div className="main_container">
        {login ? (
          <Route path="/" exact component={EntriesList}/>
        ) : (
          <Route path="/" render={(props) => <Login setLogin={setLogin}/>} />
        )}
      </div>
    </Router>
  );
}

export default Main;
