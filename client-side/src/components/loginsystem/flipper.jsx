import React, { useState } from 'react';
import Login from './login';
import Register from './register';
import './flipper.css';

const Flipper = (props) => {
  const {
    className,
  } = props;

  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={flipped ? 'flip flip-container' : 'flip-container'}>
      <div className={className}>
        <div className="front">
          <Register setFlipped={setFlipped} flipped={flipped}/>
        </div>
        <div className="back">
          <Login setFlipped={setFlipped} flipped={flipped}/>
        </div>
      </div>
    </div>
  );
};

Flipper.defaultProps = {
  className: 'flipper',
};

export default Flipper;
