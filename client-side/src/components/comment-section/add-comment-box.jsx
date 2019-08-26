import Button from '../button/index';
import React, { useState } from 'react';

const AddCommentBox = (props) => {
  const {
    className,
    children,
    disabled,
    firstValue,
    secondValue,
    setFirstValue,
    setSecondValue,
    firstPlaceHolder,
    secondPlaceHolder,
    handleSubmit,
    ref,
    ...rest
  } = props;

  const [visible, setVisible] = useState(false);

  const handleCancel = (event) => {
    event.preventDefault();
    setFirstValue('');
    setSecondValue('');
  };

  return (
    <div className={className} {...rest}>
      <form onSubmit={handleSubmit}>
        <section className="comment-section-textarea">
          <input
            disabled={disabled}
            type="text"
            name="name"
            onChange={(event) => setFirstValue(event.target.value)}
            value={firstValue}
            placeholder={firstPlaceHolder}
          />
          <textarea
            type="text"
            name="comment"
            value={secondValue}
            onChange={(event) => setSecondValue(event.target.value)}
            onFocus={() => setVisible(true)}
            placeholder={secondPlaceHolder}
            ref={ref}
            style={ visible ? { height: '10rem' } : null }
          />
        </section>
        <br/>
        <section
          className={visible ? 'comment-section-buttons' : 'comment-section-buttons invisible'}
        >
          <Button type="submit" variant="primary">submit</Button>
          <br/>
          <Button variant="secondary" onClick={(event) => handleCancel(event)}>cancel</Button>
        </section>
    </form>
    </div>
  );
};

AddCommentBox.defaultProps = {
  className: 'comment-section-form',
};

export default AddCommentBox;
