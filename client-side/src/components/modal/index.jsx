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
    <div className={visible ? 'modal' : 'invisible'} {...rest}>
      <div className={visible ? 'modal_content' : 'invisible'}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
