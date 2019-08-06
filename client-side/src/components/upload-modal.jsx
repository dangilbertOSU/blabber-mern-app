import React, { useState } from 'react';
import UploadPhoto from './upload-photo';

export const UploadModal = (props) => {

  if(props.visible){
    document.body.style.overflow = "hidden"
    return (
      <div className="upload-modal-background">
        <div className="upload-modal">
          <UploadPhoto setVisible={props.setVisible}/>
        </div>
      </div>
    )
  } else {
    document.body.style.overflow = "revert"
    return (null)
  }

}

export default UploadModal;
