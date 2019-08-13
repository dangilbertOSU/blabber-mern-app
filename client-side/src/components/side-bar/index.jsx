import React from 'react';
import './sidebar.css';
import { ReactComponent as Arrow } from './arrow.svg';

const Sidebar = (props) => {
  const {
    className,
    children,
    ...rest
  } = props;

  return (
    <div className={className} {...rest}>
      {children}
      <Arrow/>
    </div>
  );
};

Sidebar.defaultProps = {
  className: 'sidebar',
};

export default Sidebar;
