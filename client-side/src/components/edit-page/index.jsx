import Button from '../button/index';
import CreateText from '../create-text/index';
import Modal from '../modal/index';
import React, { useEffect, useState } from 'react';
import Sandbox from './Sandbox.jsx';
import Sidebar from '../side-bar/index';
import Spinner from '../spinner/index';

const Page = (props) => {
  const {
    className,
    user,
  } = props;

  const [errorMessage, setErrorMessage] = useState();
  const [changes, setChanges] = useState([]);
  const [components, setComponents] = useState({});
  const [id, setId] = useState();
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textModalOpen, setTextModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(props.user);

  const callBackendAPI = async () => {
    let path = window.location.pathname
                .replace('users', 'api')
                .replace('/editpage', '/pages')
                .toString();

    const response = await fetch(path);

    const body = await response.json();

    if (response.status !== 200) {
      setErrorMessage(body.message);
    }

    return body;
  };

  useEffect(() => {
    callBackendAPI()
        .then(res => {
          const { username } = res;
          const { title, contents, _id } = res.page;
          setCurrentUser(username);
          document.title = `${title} | blabber.`;
          contents ? setComponents(contents) : setErrorMessage('No Data');
          setId(_id);
          setLoaded(true);
        })
        .catch(err => {
          console.log(err);
        });
  }, [props.user]);

  const redirect = (path) => {
    window.location.href = path;
  };

  const saveChanges = async (event) => {
    event.preventDefault();

    const reqObj = { pageChanges: changes, pageId: id };

    console.log('changes: ', changes);

    await fetch('/api/update', {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(reqObj),
      }).then((res) => null)
    .then((data) => null)
    .catch((err)=> console.log(err));

    window.location.reload();
  };

  return (
    props.user !== currentUser ? (<p> This is not your page to edit </p>) :
    <div className={className}>
      <Sidebar>
        <Button variant="transparent" onClick={() => redirect('/')}>Home</Button>
        <Button variant="transparent" onClick={() => setTextModalOpen(true)}>Add Text</Button>
        <Button variant="transparent">Upload Photo</Button>
        <Button
          variant={editMode ? 'secondary' : 'transparent'}
          onClick={() => setEditMode(!editMode)}
        >
          Edit Mode
        </Button>
        {
          editMode ?
          <Button
            variant="transparent"
            onClick={(event) => saveChanges(event)}
          >
            Save Changes
          </Button> : null
        }
        <Button variant="transparent" onClick={() => redirect(`/users/${user}/pages/${id}`)}>Live Page</Button>
        <Button variant="transparent" onClick={() => redirect('/logout')}>Logout</Button>
      </Sidebar>
      <Modal visible={textModalOpen} setVisible={setTextModalOpen}>
        <CreateText visible={textModalOpen} setVisible={setTextModalOpen} user={user}/>
      </Modal>
      { errorMessage ? <p>{errorMessage}</p> : (
        !loaded ? <Spinner/> :
        <Sandbox
          components={components}
          editMode={editMode}
          changes={changes}
          setChanges={setChanges}
        />
      )
      }
    </div>
  );
};

Page.defaultProps = {
  className: 'page',
};

export default Page;
