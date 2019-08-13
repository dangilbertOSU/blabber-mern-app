import Draggable from 'react-draggable';
import React, { Component } from 'react';
import { ReactComponent as TrashIcon } from '../svg-files/trash-icon.svg';

export default class EntriesFeed extends Component {

  constructor(props) {
    super(props);

    this.state = {
      changes: [],
      editMode: true,
      isHovered: false,
      trashVisible: false,
      posts: props.posts,
    };
  }

  deleteEntry = async (post) => {
    if (window.confirm('Press OK to confirm.')) {

      let postsArrayCopy = this.state.posts.slice();
      let index = postsArrayCopy.indexOf(post);
      if (index !== -1) {
        postsArrayCopy.splice(index, 1);
        this.setState({ posts: postsArrayCopy });
      }

      await fetch('/api/delete', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(post),
        }).then((res) => null)
      .then((data) =>  null)
      .catch((err)=> console.log(err));
    }
  };

  getPosition = (string) => {
    let start = string.indexOf('translate(') + 10;
    let end = string.indexOf(');');

    let position = string.substring(start, end);
    position = position.split('px').join('');
    let positionArr = position.split(', ');
    positionArr[0] = Number(positionArr[0]);
    if (positionArr[1]) positionArr[1] = Number(positionArr[1]);
    else positionArr[1] = 0;

    return positionArr;
  };

  getHeight = (string) => {
    let start = string.indexOf('height: ') + 8;
    let height = string.substring(start, string.length - 3);

    return Number(height);
  };

  getWidth = (string) => {
    let start = string.indexOf('width: ') + 7;
    let end = string.indexOf('px;');
    let width = string.substring(start, end);

    return Number(width);
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleStart = (event, post) => {
    let string = event.target.offsetParent.attributes.style.value;

    // console.log(event.target.offsetParent.attributes.style.ownerElement.style.transform);
    // console.log(event.target.offsetParent.attributes.style.ownerElement.style.width);
    // console.log(event.target.offsetParent.attributes.style.ownerElement.style.height);

    console.log(string);

    const position = this.getPosition(string);
    const width = this.getWidth(string);
    const height = this.getHeight(string);

    let positionObj = {
                        id: post._id,
                        width: width,
                        height: height,
                        x: position[0],
                        y: position[1],
                      };
    let changesCopy = this.state.changes;
    changesCopy.push(positionObj);

    this.setState({ changes: changesCopy });
  };

  handleDrag = (event, ui) => {
    event.preventDefault();

    if (event.screenY > 325) {
      this.setState({ trashVisible: true });
    }

    if (event.screenY >= 405) {
      this.setState({ isHovered: true });
    }

    if (event.screenY < 405) {
      this.setState({ isHovered: false });
    }

  };

  handleStop = async (event, post) => {
    event.preventDefault();
    this.setState({ trashVisible: false, isHovered: false });

    if (event.screenY >= 405) {
      this.deleteEntry(post);
    } else {
      this.handleStart(event, post);
    }
  };

  enterEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  createDraggable = (post) => {
    if (this.state.editMode) {
      return (
        <Draggable
          defaultPosition={{ x: post.x, y: post.y }}
          handle={'.edit-move-handle'}
          onStart={(event) => this.handleStart(event, post)}
          onDrag={(event) => this.handleDrag(event, post)}
          onStop={(event) => this.handleStop(event, post)}
        >
          <div
            className='submissions_post_edit_mode'
            style={{ width: post.width, height: post.height }}
          >
            <span className='edit-move-handle'></span>
            {this.getFormat(post)}
          </div>
        </Draggable>
      );
    } else {
      return (
        <Draggable
          defaultPosition={{ x: post.x, y: post.y }}
          disabled={true}
        >
          <div className='submissions_post' style={{ width: post.width, height: post.height }}>
              {this.getFormat(post)}
          </div>
        </Draggable>
      );
    }

  };

  getFormat = (post) => {
    if (post.url) {
      return (<img src={'/uploads/' + post.url} alt={'picture' + post.url}/>);
    } else if (post.heading) {
      return (<h1>{post.heading.message}</h1>);
    } else if (post.paragraph) {
      return (<p>{post.paragraph.message}</p>);
    }
  };

  saveChanges = async (event) => {
    event.preventDefault();

    await fetch('/api/update', {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(this.state.changes),
      }).then((res) => null)
    .then((data) => null)
    .catch((err)=> console.log(err));

    window.location.reload();
  };

  render() {
    return (
      <div>
        <div className="edit-button">
          <button
            className={
                        this.state.editMode
                        ? 'PrimaryButton'
                        : 'SecondaryButton'
                      }
            onClick={this.enterEditMode}
          >
            edit mode
          </button>
          {
            this.state.editMode
              ? <button
                  className="SecondaryButton save-button"
                  onClick={(event) => this.saveChanges(event)}
                >
                  save changes
                </button>
              : null
          }
        </div>
        {
          this.state.trashVisible ?
          <div className={!this.state.isHovered ? 'trash-area' : 'trash-area-hovered'}>
            <TrashIcon className={!this.state.isHovered ? 'trashicon' : 'trashicon-hovered'}/>
          </div> : null
        }
        <div className='submissions'>
          {
            this.state.posts.map((post, index) => {
              if (post.heading || post.paragraph || post.url) {
                return (
                  this.createDraggable(post)
                );
              }

              return null;
            })
          }
        </div>
      </div>
    );
  }
}
