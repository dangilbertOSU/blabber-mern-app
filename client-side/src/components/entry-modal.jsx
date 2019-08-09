import React from 'react';
import CreateEntry from './create-entry';

export const EntryModal = (props) => {

  if (props.visible) {
    document.body.style.overflow = 'hidden';
    return (
      <div className="upload-modal-background">
        <div className="upload-modal">
          <CreateEntry
            setVisible={props.setVisible}
            updateEntries={props.updateEntries}
            posts={props.posts}
            setPosts={props.setPosts}
          />
        </div>
      </div>
    );
  } else {
    document.body.style.overflow = 'revert';
    return (null);
  }

};

export default EntryModal;
