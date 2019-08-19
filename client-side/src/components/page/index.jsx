import CommentSection from '../comment-section/index';
import Draggable from 'react-draggable';
import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/index';

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
        <div className={className} {...rest}>
          {
            page.contents.component.map((component, index) => {
              return (
                <Draggable
                  defaultPosition={{ x: component.position.x, y: component.position.y }}
                  disabled={true}
                >
                  <div
                    className='submissions_post'
                    style={{ width: component.size.width, height: component.size.height }}
                  >
                    <p>{component.text.value}</p>
                  </div>
                </Draggable>
              );
            })
          }
          <CommentSection id={id} page={page}/>
        </div>
      ) : (<Spinner/>)
  );
};

Page.defaultProps = {
  className: 'page',
};

export default Page;
