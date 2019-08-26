import React from 'react';
import './modal.css';

const Modal = (props) => {
  const {
    className,
    children,
    setVisible,
    visible,
    ...rest
  } = props;

  const callSetVisible = () => {
    setVisible();
    console.log('clicked');
  };

  return (
    visible ?
    <React.Fragment>
      <div className="modal" {...rest} onClick={setVisible ? callSetVisible : null}></div>
      <div className="modal_content">{children}</div>
    </React.Fragment>
    : null
  );
};

export default Modal;
