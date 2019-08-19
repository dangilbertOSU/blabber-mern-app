import React from 'react';

const FourOhFour = (props) => {
  const {
    className,
    children,
    ...rest
  } = props;

  return (
    <div className={className} {...rest}>
      <p>404 error not found.</p>
    </div>
  );
};

FourOhFour.defaultProps = {
  className: 'FourOhFour',
};

export default FourOhFour;
