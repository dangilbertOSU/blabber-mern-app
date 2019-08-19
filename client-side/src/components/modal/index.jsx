import React from 'react';
import './modal.css';

const Modal = (props) => {
  const {
    className,
    children,
    visible,
    ...rest
  } = props;

  return (
    visible ?
    <div className="modal" {...rest}>
      <div className="modal_content">
        {children}
      </div>
    </div>
    : null
  );
};

export default Modal;
