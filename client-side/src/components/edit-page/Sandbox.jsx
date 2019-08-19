import Draggable from 'react-draggable';
import React, { Component } from 'react';
import { getPosition, getHeight, getWidth } from './getFunctions.js';

export default class Sandbox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      trashVisible: false,
      components: {},
    };
  }

  deleteEntry = async (post) => {
    if (window.confirm('Press OK to confirm.')) console.log('deleted');

    //   let postsArrayCopy = this.state.posts.slice();
    //   let index = postsArrayCopy.indexOf(post);
    //   if (index !== -1) {
    //     postsArrayCopy.splice(index, 1);
    //     this.setState({ posts: postsArrayCopy });
    //   }
    //
    //   await fetch('/api/delete', {
    //       method: 'POST',
    //       mode: 'cors',
    //       cache: 'no-cache',
    //       credentials: 'same-origin',
    //       headers: { 'Content-Type': 'application/json' },
    //       redirect: 'follow',
    //       referrer: 'no-referrer',
    //       body: JSON.stringify(post),
    //     }).then((res) => null)
    //   .then((data) =>  null)
    //   .catch((err)=> console.log(err));
    // }
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleStart = (event, component) => {
    let string = event.target.offsetParent.attributes.style.value;

    let { height, width } = event.target.offsetParent.attributes.style.ownerElement.style;

    const position = getPosition(string);
    width = getWidth(width);
    height = getHeight(height);

    let positionObj = {
                        textId: component.text.textId,
                        width: width,
                        height: height,
                        x: position[0],
                        y: position[1],
                      };
    let changesCopy = this.props.changes;

    changesCopy.map((item, index) => {
      console.log('item: ', item.textId);
      if (item.textId === component.text.textId) {
        changesCopy = changesCopy.splice(index, 4, positionObj);
        return this.props.setChanges(changesCopy);
      } else {
        changesCopy = changesCopy.push(positionObj);
        return this.props.setChanges(changesCopy);
      }
    });

    this.props.setChanges(changesCopy);
  };

  handleDrag = (event, ui) => {
    event.preventDefault();
    // if (event.screenY > 325) {
    //   this.setState({ trashVisible: true });
    // }
    //
    // if (event.screenY >= 405) {
    //   this.setState({ isHovered: true });
    // }
    //
    // if (event.screenY < 405) {
    //   this.setState({ isHovered: false });
    // }
  };

  handleStop = (event, component) => {
    event.preventDefault();
    let string = event.target.offsetParent.attributes.style.value;

    let { height, width } = event.target.offsetParent.attributes.style.ownerElement.style;

    const position = getPosition(string);
    width = getWidth(width);
    height = getHeight(height);

    let positionObj = {
                        textId: component.text.textId,
                        width: width,
                        height: height,
                        x: position[0],
                        y: position[1],
                      };
    let changesCopy = this.props.changes;

    changesCopy.map((item, index) => {
      console.log('item: ', item.textId);
      if (item.textId === component.text.textId) {
        changesCopy = changesCopy.splice(index, 4, positionObj);
        return this.props.setChanges(changesCopy);
      } else {
        changesCopy = changesCopy.push(positionObj);
        return this.props.setChanges(changesCopy);
      }
    });
  };

  enterEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  createDraggable = (component) => {
    const { text, position, size } = component;
    if (this.props.editMode) {
      return (
        <Draggable
          handle={'.edit-move-handle'}
          onStart={(event) => this.handleStart(event, component)}
          onDrag={(event) => this.handleDrag(event, component)}
          onStop={(event) => this.handleStop(event, component)}
        >
          <div
            className='submissions_post_edit_mode'
            style={{ width: size.width, height: size.height }}
          >
            <span className='edit-move-handle'></span>
            <p>{text.value}</p>
          </div>
        </Draggable>
      );
    } else {
      return (
        <Draggable
          defaultPosition={{ x: position.x, y: position.y }}
          disabled={true}
        >
          <div className='submissions_post' style={{ width: size.width, height: size.height }}>
            <p>{text.value}</p>
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

  render() {

    return (
      <div>
        {
          this.props.components.map((component, index) => {
            return (
              this.createDraggable(component)
            );
          })
        }
      </div>
    );
  }
}
