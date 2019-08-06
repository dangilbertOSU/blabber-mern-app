import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Controller, Scene } from 'react-scrollmagic';
import EntriesList from './entries-feed';
import Login from './loginsystem/login';
import React, { useState } from 'react';
import UploadModal from './upload-modal';

function Main() {

  const [login, setLogin] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <Router>
      {!modalVisible ?
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
                {login ?
                  <React.Fragment>
                    <li>
                      <button className="PrimaryButton" onClick={() => setModalVisible(true)}>upload photo</button>
                    </li>
                    <li>
                      <button className="SecondaryButton" onClick={() => setLogin(false)}>logout</button>
                    </li>
                  </React.Fragment>
                   :
                   null}
                </ul>
              </div>
            </div>
        </Scene>
      </Controller>
      : null }
      <div className="main_container">
        <UploadModal visible={modalVisible} setVisible={setModalVisible}/>
        {login ? (<Route path="/" exact component={EntriesList}/>)
          : (<Route path="/" render={(props) => <Login setLogin={setLogin}/>} />)}
      </div>
    </Router>
  );
}

export default Main;
