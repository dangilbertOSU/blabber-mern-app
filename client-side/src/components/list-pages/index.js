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
            const { title, description, page_id } = item.page;
            const { user } = props;

            return (
              <React.Fragment>
                <div className="page_item">
                  <Link to={`/users/${user}/editpage/${page_id}`}>
                    <p className="page_item_title">{title}</p>
                  </Link>
                  <p>{description}</p>
                </div>
              </React.Fragment>
            );
          })
        ) : null
      }
    </div>
  );
};

export default ListPages;
