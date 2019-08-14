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
        <div className='list_pages'>
          {
            (pages && pages.length > 0) ? (
              pages.map((item, index) => {
                const { title, description, page_id } = item.page;

                return (
                  <React.Fragment>
                    <div className="page_item">
                      <Link to={`/users/${usernameState}/pages/${page_id}`}>
                        <p className="page_item_title">{title}</p>
                      </Link>
                      <p>{description}</p>
                    </div>
                  </React.Fragment>
                );
              })
            ) : <p>{errorMessage}</p>
          }
        </div>
      ) : (<Spinner/>)
  );
};

UserPage.defaultProps = {
  className: 'page',
};

export default UserPage;
