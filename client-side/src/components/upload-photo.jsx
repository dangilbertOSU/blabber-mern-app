import React from 'react';
import axios from 'axios';

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  onFormSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo_file', this.state.file, this.state.filename);

    await axios({
      method: 'post',
      url: '/api/uploadphoto',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data;' },
    });

    this.props.setVisible(false);
    window.location.reload();
  };

  updateEntries = (post) => {
    let postsArrayCopy = this.props.posts;
    postsArrayCopy.push(post);
    this.props.setPosts(postsArrayCopy);
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" name="photo_file" onChange={this.onChange}/>
        <input class="SecondaryButton" type="submit" value="upload"/>
        <button class="PrimaryButton" onClick={() => this.props.setVisible(false)}>cancel</button>
      </form>
    );
  }
}

export default UploadPhoto;
