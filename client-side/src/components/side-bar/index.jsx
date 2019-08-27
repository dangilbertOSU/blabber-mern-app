import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  const {
    className,
    children,
    ...rest
  } = props;

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={expanded ? 'sidebar expanded' : 'sidebar'} {...rest}>
      <div className={expanded ? 'content dissolve' : 'content'}>
        {children}
      </div>
        <div
          className="sidebar-expander"
          onClick={() => setExpanded(!expanded)}
        />
    </div>
  );
};

export default Sidebar;
