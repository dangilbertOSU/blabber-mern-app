import React, { useState } from 'react';

const AlertBox = (props) => {
  const {
    className,
    message,
    ...rest
  } = props;

  const [visible, triggerVisible] = useState(false);

  if (visible) {
    setTimeout(() => {
        triggerVisible(false);
      }, 5000);
  }

  return (
    <div className={className} {...rest}>
      <p>{message}</p>
    </div>
  );
};

AlertBox.defaultProps = {
  className: 'alert-box',
};

export default AlertBox;
