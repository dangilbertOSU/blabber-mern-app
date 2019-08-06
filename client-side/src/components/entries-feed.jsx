import CreateEntry from './create-entry';
import Draggable from 'react-draggable';
import React, {Component} from 'react';
import { ReactComponent as TrashIcon } from '../svg-files/trash-icon.svg'

export default class EntriesFeed extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: [],
      loaded: false,
      trashVisible: false
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
    this.setState({loaded: true})
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/posts');
    const body = await response.json();

    if (response.status !== 200) {
     throw Error(body.message)
    }

    return body;
  };

  deleteEntry = (post) => {
    if (window.confirm("Press OK to confirm.")) {

      let postsArrayCopy = this.state.posts.slice();
      let index = postsArrayCopy.indexOf(post);
      if(index !== -1){
        postsArrayCopy.splice(index, 1);
        this.setState({ posts: postsArrayCopy })
      }

      fetch('/api/delete', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: { "Content-Type": "application/json" },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(post), // body data type must match "Content-Type" header
      }).then((res) => console.log(res))
      .then((data) =>  console.log(data))
      .catch((err)=> console.log(err))
    }
  }

  handleStart = (event) => {
    event.preventDefault();
    this.setState({trashVisible: true});
  }

  handleStop = (event, post) => {
    event.preventDefault();
    this.setState({trashVisible: false});
    //console.log(event.screenX, event.screenY)
    //console.log(window.innerHeight - 80);
    if(event.screenY >= 500){
      this.deleteEntry(post);
    }
    // console.log("OH NO I'VE StOPPED: ", post)
  }

  render() {
    return (
      <div>
        <CreateEntry updateEntries={this.updateEntries} />
        {
          this.state.trashVisible ?
          <div className="trash-area">
            <TrashIcon className="trashicon"/>
          </div> : null
        }
        <div className="submissions">
          {
            !this.state.loaded ? (<p>loading...</p>) :
            (this.state.posts.map((post, index) => {
              if(post.message && post.date){
                return (
                  <Draggable
                    defaultPosition={{x: 0, y: 0}}
                    position={{x: 0, y: 0}}
                    grid={[25, 25]}
                    scale={1}
                    onStart= {(event) => this.handleStart(event)}
                    onStop={(event) => this.handleStop(event, post)}
                  >
                    <div className="submissions_post">
                      <p>{post.message}</p>
                      <p className="submissions_post_date">{post.date}</p>
                    </div>
                  </Draggable>
                )
              }
              else {
                return null;
              }
            }))
          }
        </div>
      </div>
    )
  }
}
