import './comment-section.css';

import AddCommentBox from './add-comment-box.jsx';

//import Button from '../button/index';
import React, { useEffect, useRef, useState } from 'react';

import { addComment } from './addComment.js';
import { scrollToRef } from '../scroll-to/index';

const CommentSection = (props) => {
  const {
    className,
    children,
    id,
    page,
    ...rest
  } = props;

  const [commentValue, setCommentValue] = useState();
  const [nameValue, setNameValue] = useState();

  const scroll = useRef();

  useEffect(() => {
    scrollToRef(scroll);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const information = {
      id: props.id,
      commentObj: {
        comment: commentValue,
        name: nameValue
      }
    };

    addComment(information, window.location.reload());
    setCommentValue('');
    setNameValue('');
  };

  const commentBox = (comment) => {
    return (
      <div className="comment-content">
        <p className="comment-content-name">{comment.name}</p>
        <p className="comment-content-comment">{comment.comment}</p>
        <p className="comment-content-date">{comment.date.substring(0, 10)}</p>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className={className} {...rest}>
        <AddCommentBox
          firstValue={nameValue}
          secondValue={commentValue}
          setFirstValue={setNameValue}
          setSecondValue={setCommentValue}
          firstPlaceHolder="place name here..."
          secondPlaceHolder="add comment here..."
          handleSubmit={(event) => handleSubmit(event)}
        />
        <div className="comment-section-comments" ref={scroll}>
          <p>Comments: {page.comments.length}</p>
          {
            page.comments.map((comment, index) => {
              return commentBox(comment);
            })
          }
        </div>
      </div>
    </React.Fragment>
  );
};

CommentSection.defaultProps = {
  className: 'comment-section',
};

export default CommentSection;
