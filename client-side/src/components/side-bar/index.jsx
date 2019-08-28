import React from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  const {
    className,
    children,
    ...rest
  } = props;

  return (
    <div className="sidebar" {...rest}>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
