import React, { useEffect } from 'react';

const Logout = (props) => {
  const {
    className,
    children,
    ...rest
  } = props;

  const callBackendAPI = async () => {
    const response = await fetch('/logout');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  useEffect(() => {
    callBackendAPI()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={className} {...rest}>
      <p>You've been logged out</p>
      <a href='/login'>Click here to log back in.</a>
    </div>
  );
};

Logout.defaultProps = {
  className: 'logout',
};

export default Logout;
