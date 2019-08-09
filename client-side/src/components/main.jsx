import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Controller, Scene } from 'react-scrollmagic';
import EntriesFeed from './entries-feed';
import EntryModal from './entry-modal';
import Login from './loginsystem/login';
import React, { useState, useEffect } from 'react';
import UploadModal from './upload-modal';

function Main() {

  const [login, setLogin] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [entryModalVisible, setEntryModalVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  const callBackendAPI = async () => {
    const response = await fetch('/api/posts');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  useEffect(() => {
    callBackendAPI()
      .then(res => {
        setPosts(res);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, []);

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
                {login ?
                  <React.Fragment>
                    <li>
                      <button
                        className="PrimaryButton"
                        onClick={() => setEntryModalVisible(true)}
                      >
                        create entry
                      </button>
                    </li>
                    <li>
                      <button
                        className="PrimaryButton"
                        onClick={() => setModalVisible(true)}
                      >
                        upload photo
                      </button>
                    </li>
                    <li>
                      <button
                        className="SecondaryButton"
                        onClick={() => setLogin(false)}
                      >
                        logout
                      </button>
                    </li>
                  </React.Fragment>
                   :
                   null}
                </ul>
              </div>
            </div>
        </Scene>
      </Controller>
      <div className="main_container">
        <UploadModal
          visible={modalVisible}
          setVisible={setModalVisible}
          setPosts={setPosts}
          posts={posts}
        />
        <EntryModal
          visible={entryModalVisible}
          setVisible={setEntryModalVisible}
          setPosts={setPosts}
          posts={posts}
        />
        {login
          ? (loaded ? <EntriesFeed posts={posts}/> : <p>loading...</p>)
          : (<Login setLogin={setLogin} />)}
      </div>
    </Router>
  );
}

export default Main;
