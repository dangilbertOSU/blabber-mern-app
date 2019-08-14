import React from 'react';
import { ReactComponent as ArrowSvg } from './arrow.svg';
import './arrow.css';

const Arrow = (props) => {
  const {
    className,
    onClick,
    type,
    ...rest
  } = props;

  return (
      <React.Fragment>
        <ArrowSvg className={className} onClick={onClick} type={type} {...rest}/>
      </React.Fragment>
  );
};

Arrow.defaultProps = {
  className: 'arrow',
};

export default Arrow;
