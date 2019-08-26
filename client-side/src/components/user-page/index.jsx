import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/index';
import { Link } from 'react-router-dom';

const UserPage = (props) => {

  const [pages, setPages] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [usernameState, setUsernameState] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const callBackendAPI = async () => {
    const path = window.location.pathname.replace('users', 'api').toString();

    const user = path.replace('/api/', '').replace('/', '');
    document.title = `${user} | blabber.`;
    setUsernameState(user);

    const response = await fetch(path + '/pages');
    const body = await response.json();

    if (response.status !== 200) {
      setErrorMessage(body.message);
      setLoaded(true);
    } else {
      return body;
    }

  };

  useEffect(() => {
    callBackendAPI()
      .then(res => {
        setPages(res);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, []);

  return (
      loaded ? (
        <div className="pages_container">
          <div className='list_pages'>
            {
              (pages && pages.length > 0) ? (
                pages.map((page, index) => {
                  const { title, description, _id } = page;

                  return (
                    <Link to={`/users/${usernameState}/pages/${_id}`}>
                      <div className="page_item">
                        <p className="page_item_title">{title}</p>
                        <p>{description}</p>
                      </div>
                    </Link>
                  );
                })
              ) : <p>{errorMessage}</p>
            }
          </div>
        </div>
      ) : (<Spinner/>)
  );
};

UserPage.defaultProps = {
  className: 'page',
};

export default UserPage;
