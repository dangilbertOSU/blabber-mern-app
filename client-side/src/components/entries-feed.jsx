import React, {Component} from 'react';
import CreateEntry from './create-entry';
import { Controller, Scene } from 'react-scrollmagic';
// import './entries-feed.css'

export default class EntriesFeed extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: []
    }
  }

  updateEntries = (message) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd ;
    if (mm < 10) mm = '0'+ mm;

    today = mm + '/' + dd + '/' + yyyy;

    let postsArrayCopy = this.state.posts.slice();
    postsArrayCopy.push({message: message, date: today});
    this.setState({posts:postsArrayCopy})
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({posts: res}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/posts');
    const body = await response.json();

    if (response.status !== 200) {
     throw Error(body.message)
    }
    console.log("Body: ", body)
    return body;
  };

  deleteLastEntry = () => {
    if (window.confirm("Press OK to confirm.")) {
      console.log('Post not removed because I don\'t know how');
    }
  }

  render() {
    return (
      <div>
        <CreateEntry updateEntries={this.updateEntries} />
        <div className="submissions">
         <Controller>
          {
            /* add reverse={false} to not reverse the fade*/
            this.state.posts.map((post, index) => {
              return (
                <Scene classToggle="fade_in" triggerElement="#dummy" offset={100}>
                <div className="submissions_post">
                  <p>{post.message}</p>
                  <p className="submissions_post_date">{post.date}</p>
                </div>
                </Scene>
              )
            })
          }
        </Controller>
        </div>
      </div>
    )
  }
}
