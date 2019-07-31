import React, {Component} from 'react';
// import './create-entry.css';

export default class CreateEntry extends Component {

  submitEntry = (event) => {
    event.preventDefault();

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd ;
    if (mm < 10) mm = '0'+ mm;

    today = mm + '/' + dd + '/' + yyyy;

    let newPostValue = this.refs.NewPost.value;

    if(newPostValue !== ""){
      const newPost = { message: newPostValue, date: today }

      fetch('/api/add', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: { "Content-Type": "application/json" },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(newPost), // body data type must match "Content-Type" header
      }).then((res) => console.log(res))
      .then((data) =>  console.log(data))
      .catch((err)=> console.log(err))

      let postValueToPass = newPostValue;
      this.props.updateEntries(postValueToPass);
      this.refs.NewPost.value = '';

      return postValueToPass;
    }
  }

  cancelEntry = () => {
    this.refs.NewPost.value = '';
  }

  render() {
    return (
      <div className="create-entry">
        <textarea ref="NewPost" placeholder="Feel free to blabber here..."></textarea>
        <div className="create-entry-buttons">
          <button className="PrimaryButton" onClick={this.submitEntry}>Submit</button>
          <button className="SecondaryButton" onClick={this.cancelEntry}>Cancel</button>
        </div>
      </div>
    )
  }
}
