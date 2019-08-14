import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/index';

const Page = (props) => {
  const {
    className,
    user,
    ...rest
  } = props;

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
        document.title = `${res.title} | blabber.`;
        setPage(res);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, []);

  return (
      loaded ? (
        <div className={className} {...rest}>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
      ) : (<Spinner/>)
  );
};

Page.defaultProps = {
  className: 'page',
};

export default Page;
