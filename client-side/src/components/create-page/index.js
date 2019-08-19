import React, { useState } from 'react';
import Button from '../button/index';

import './create-page.css';
import { addPage } from './addPage';

const CreatePage = (props) => {

  const {
    className,
    children,
    setVisible,
    user,
    visible,
    ...rest
  } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCancel = (event) => {
    event.preventDefault();
    setTitle('');
    setDescription('');
    setVisible(!visible);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const user = props.user;
    const information = { user, title, description };
    await addPage(information, window.location.reload());
  };

  const handleChange = (event) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
    };

    if (event.target.name === 'description') {
      setDescription(event.target.value);
    };

  };

  return (
    <div className={className} {...rest}>
      <form onSubmit={ handleSubmit }>
        <section>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="title..."
          />
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="description..."
          />
        </section>
        <br/>
        <section className="create-page-buttons">
          <Button type="submit" variant="primary">Create Page</Button>
          <br/>
          <Button variant="secondary" onClick={(event) => handleCancel(event)}>Cancel</Button>
        </section>
      </form>
    </div>
  );
};

CreatePage.defaultProps = {
  className: 'create-page-form',
};

export default CreatePage;
