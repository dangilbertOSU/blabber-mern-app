import React from 'react';

const Container = (props) => {
  const {
    className,
    children,
    ...rest
  } = props;

  return (
    <div className={className} {...rest}>{children}</div>
  );
};

Container.defaultProps = {
  className: 'main_container',
};

export default Container;
