import React, { Component } from 'react';

export default class CreateEntry extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: props.posts,
      heading: false,
      paragraph: true,
    };
  }

  submitEntry = async (event) => {
    event.preventDefault();

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = mm + '/' + dd + '/' + yyyy;

    let newPostValue = this.refs.NewPost.value;

    if (newPostValue !== '') {
      const newPost = this.state.heading
                      ? { heading: { message: newPostValue, date: today }, x: 50, y: 0 }
                      : { paragraph: { message: newPostValue, date: today }, x: 50, y: 0 };

      console.log(newPost);
      await fetch('/api/add', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(newPost), // body data type must match "Content-Type" header
        })
        .then((res) => console.log(res))
        .then((data) =>  console.log(data))
        .catch((err)=> console.log(err));

      //this.updateEntries(newPost);
      this.refs.NewPost.value = '';
      this.props.setVisible(false);

      window.location.reload();
    }
  };

  updateEntries = (post) => {
    let postsArrayCopy = this.state.posts;
    postsArrayCopy.push(post);
    this.props.setPosts(postsArrayCopy);
  };

  cancelEntry = () => {
    this.refs.NewPost.value = '';
    this.props.setVisible(false);
  };

  setFormat = () => {
    this.setState({ heading: !this.state.heading, paragraph: !this.state.paragraph });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <button
            className={this.state.heading ? 'PrimaryButton' : 'SecondaryButton'}
            onClick={this.setFormat}
          >
            heading
          </button>
          <button
            className={this.state.paragraph ? 'PrimaryButton' : 'SecondaryButton'}
            onClick={this.setFormat}
          >
            paragraph
          </button>
        </div>
        <div className="create-entry">
          <textarea ref="NewPost" placeholder="Feel free to blabber here..."></textarea>
          <div className="create-entry-buttons">
            <button className="PrimaryButton" onClick={this.submitEntry}>Submit</button>
            <button className="SecondaryButton" onClick={this.cancelEntry}>Cancel</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
