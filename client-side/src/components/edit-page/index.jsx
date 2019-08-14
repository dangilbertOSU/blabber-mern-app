import Button from '../button/index';
import CreateText from '../create-text/index';
import Modal from '../modal/index';
import React, { useEffect, useState } from 'react';
import Sidebar from '../side-bar/index';
import Spinner from '../spinner/index';

const Page = (props) => {
  const {
    className,
    user,
  } = props;

  const [page, setPage] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textModalOpen, setTextModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const callBackendAPI = async () => {
    // path = api/:username/pages/:pageid
    let path = window.location.pathname
                .replace('users', 'api')
                .replace('/editpage', '/pages')
                .toString();
    const response = await fetch(path);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  useEffect(() => {
    callBackendAPI()
      .then(res => {
        document.title = `${res.title} | blabber.`;
        setPage(res);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={className}>
      <Sidebar>
        <Button variant="secondary" onClick={() => setTextModalOpen(true)}>Add Text</Button>
        <Button variant="secondary" onClick={() => setPhotoModalOpen(true)}>Upload Photo</Button>
        <Button variant="secondary" onClick={() => setEditMode(!editMode)}>Edit Mode</Button>
      </Sidebar>
      <Modal visible={textModalOpen}>
        <CreateText visible={textModalOpen} setVisible={setTextModalOpen} user={user}/>
      </Modal>
      {
        !loaded ? <Spinner/> :
        <p>Content Goes Here!!</p>
      }
      { page + photoModalOpen }
    </div>
  );
};

Page.defaultProps = {
  className: 'page',
};

export default Page;
