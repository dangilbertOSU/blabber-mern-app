import React from 'react';
import { Link } from 'react-router-dom';
import './list-pages.css';

const ListPages = (props) => {

  const { pages } = props;

  return (
    <div className='list_pages'>
      {
        (pages.length > 0) ? (
          pages.map((item, index) => {
            const { title, description, _id } = item;
            const { user } = props;

            return (
              <Link to={`/users/${user}/editpage/${_id}`} key={index}>
                <div className="page_item">
                  <p className="page_item_title">{title}</p>
                  <p>{description}</p>
                </div>
              </Link>
            );
          })
        ) : null
      }
    </div>
  );
};

export default ListPages;
