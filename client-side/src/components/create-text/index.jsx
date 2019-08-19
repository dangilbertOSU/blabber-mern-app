import React, { useState } from 'react';
import Button from '../button/index';
import './addText.css';

import { addText } from './addText';

const CreateText = (props) => {

  const {
    className,
    children,
    setVisible,
    user,
    visible,
    ...rest
  } = props;

  const [textValue, setTextValue] = useState('');

  const handleCancel = (event) => {
    event.preventDefault();
    setTextValue('');
    setVisible(!visible);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const user = props.user;
    const pageId = window.location.pathname.replace(`/users/${user}/editpage/`, '');
    const information = { user, textValue, pageId };

    addText(information, window.location.reload());
    setTextValue('');
    setVisible(!visible);
  };

  const handleChange = (event) => {
    if (event.target.name === 'textValue') {
      setTextValue(event.target.value);
    };
  };

  return (
    <div className={className} {...rest}>
      <form onSubmit={ handleSubmit }>
        <section>
          <textarea
            ref={input => input && input.focus()}
            type="text"
            name="textValue"
            value={textValue}
            onChange={handleChange}
            placeholder="add text here..."
          />
        </section>
        <br/>
        <section className="create-page-buttons">
          <Button type="submit" variant="primary">Submit</Button>
          <br/>
          <Button variant="secondary" onClick={(event) => handleCancel(event)}>Cancel</Button>
        </section>
      </form>
    </div>
  );
};

CreateText.defaultProps = {
  className: 'create-page-form',
};

export default CreateText;
