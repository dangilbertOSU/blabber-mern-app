import React from 'react';
import { ReactComponent as SpinnerSvg } from './spinner.svg';
import './spinner.css';

const Spinner = (props) => {
  const {
    className,
    ...rest
  } = props;

  return (
      <React.Fragment>
         <SpinnerSvg className={className}{...rest}/>
      </React.Fragment>
  );
};

Spinner.defaultProps = {
  className: 'spinner',
};

export default Spinner;
