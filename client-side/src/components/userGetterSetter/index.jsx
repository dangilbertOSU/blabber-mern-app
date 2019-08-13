import React, { useState } from 'react';

export const userGetterSetter = (Component) => {

  return (props) => {

    const [user, setUser] = useState('default');

    return (
      <React.Fragment>
        <Component user={user} setUser={setUser} {...props} />
      </React.Fragment>
    );
  };
};

export default userGetterSetter;
