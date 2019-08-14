import React, { useState } from 'react';
import './sidebar.css';
import Arrow from '../arrow/index';

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
        <Arrow
          className={expanded ? 'arrow rotated' : 'arrow'}
          onClick={() => setExpanded(!expanded)}
        />
    </div>
  );
};

// Sidebar.defaultProps = {
//   className: 'sidebar',
// };

export default Sidebar;
