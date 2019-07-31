import React from 'react';
import axios from 'axios';

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      file: null
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  onFormSubmit(e){
    e.preventDefault()
    const formData = new FormData();
    formData.append('photo_file', this.state.file, this.state.filename);

    axios({
      method: 'post',
      url: '/api/uploadphoto',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data;'}
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" name="photo_file" onChange={this.onChange}/>
        <input class="SecondaryButton" type="submit" value="Upload."/>
      </form>
    )
  }
}

export default UploadPhoto;
