import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import EntriesList from './entries-feed';
import UploadPhoto from './upload-photo'

import { ReactComponent as UploadPhotoIcon } from '../svg-files/upload-photo.svg'
import { ReactComponent as LargeGear } from '../svg-files/settings-gear-large.svg'
import { ReactComponent as SmallGear } from '../svg-files/settings-gear-small.svg'

import { Controller, Scene } from 'react-scrollmagic';

function Main() {
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
              <li><Link to="/upload"><UploadPhotoIcon/></Link></li>
              <li><a href="/" className="Globalheader_Gears"><LargeGear/><SmallGear/></a></li>
            </ul>
          </div>
        </div>
        </Scene>
      </Controller>
      <div className="main_container">
        <Route path="/upload" exact component={UploadPhoto}/>
        <Route path="/" exact component={EntriesList}/>
      </div>
    </Router>

  );
}

export default Main;
