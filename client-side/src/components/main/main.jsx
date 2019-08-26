import Button from '../button/index';
import CreatePage from '../create-page/index';
import ListPages from '../list-pages/index';
import Modal from '../modal/index';
import React, { useEffect, useState } from 'react';
import Sidebar from '../side-bar/index';
import Spinner from '../spinner/index';
import { callBackendAPI } from '../list-pages/load-page-data';

import './main.css';

const Main = (props) => {

  const [pages, setPages] = useState();
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  const { user } = props;

  useEffect(() => {
    if (props.user !== null) {
      callBackendAPI(props.user)
        .then(res => {
          setPages(res);
          setLoaded(true);
        })
        .catch(err => console.log(err));

      document.title = `${props.user} | blabber.`;
    }
  }, [props.user]);

  const styles = {
    textAlign: 'center',
  };

  return (
      <React.Fragment>
        <div>
          <Sidebar>
            <Button
              variant="transparent"
              onClick={() => setVisible(!visible)}
            >
              add page
            </Button>
          </Sidebar>
            <div className="pages_container" style={loaded ? null : styles}>
              {loaded ? <ListPages user={user} pages={pages}/> : <Spinner/>}
            </div>
        </div>
        {/* modal */}
        <Modal visible={visible} setVisible={setVisible}>
          <CreatePage visible={visible} setVisible={setVisible} user={user}/>
        </Modal>
      </React.Fragment>
  );
};

export default Main;
