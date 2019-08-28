import Button from '../button/index';
import CommentSection from '../comment-section/index';
import Draggable from 'react-draggable';
import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/index';

import './page.css';

import { ReactComponent as Home } from '../../house.svg';

const Page = (props) => {
  const {
    className,
    user,
    ...rest
  } = props;

  const [errorMessage, setErrorMessage] = useState();
  const [id, setId] = useState();
  const [page, setPage] = useState({});
  const [loaded, setLoaded] = useState(false);

  const callBackendAPI = async () => {
    const path = window.location.pathname.replace('users', 'api').toString();

    const response = await fetch(path);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    callBackendAPI()
      .then(res => {
        const { title, contents, _id } = res.page;
        document.title = `${title} | blabber.`;
        contents ? setPage(res.page) : setErrorMessage('No Data');
        setId(_id);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, []);

  return (
      errorMessage ? <p>{errorMessage}</p> :
      loaded ? (
        <React.Fragment>
        <div className={className} {...rest}>
          {
            page.contents.map((component, index) => {
              return (
                <Draggable
                  defaultPosition={{ x: component.component.position.x, y: component.component.position.y }}
                  disabled={true}
                  key={index}
                >
                  <div
                    className='submissions_post'
                    style={{ width: component.component.size.width, height: component.component.size.height }}
                  >
                    <p>{component.component.text.value}</p>
                  </div>
                </Draggable>
              );
            })
          }
        </div>
        <CommentSection id={id} page={page} user={user}/>
        </React.Fragment>
      ) : (<Spinner/>)
  );
};

Page.defaultProps = {
  className: 'page-content',
};

export default Page;
