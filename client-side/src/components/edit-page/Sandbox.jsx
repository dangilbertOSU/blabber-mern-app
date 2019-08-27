import Draggable from 'react-draggable';
import React, { Component } from 'react';
import { getPosition, getHeight, getWidth } from './getFunctions.js';

import './sandbox.css';

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
    if (window.confirm('Press OK to confirm.')) {
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
    };
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
      _id: component._id,
      changes: {
        text: {
          value: component.component.text.value
        },
        position: {
          x: position[0],
          y: position[1],
        },
        size: {
          width: width,
          height: height,
        }
      }
    };

    let changesCopy = this.props.changes;
    changesCopy.push(positionObj);
    this.props.setChanges(changesCopy);
  };

  handleDrag = (event, component) => {
    event.preventDefault();

    // if (event.screenY < -121) {
    //   console.log('Deleted');
    // }
  };

  handleStop = (event, component) => {
    event.preventDefault();

    // if (event.screenY < -121) {
    //   this.deleteEntry(component);
    // }

    let string = event.target.offsetParent.attributes.style.value;

    let { height, width } = event.target.offsetParent.attributes.style.ownerElement.style;

    const position = getPosition(string);
    width = getWidth(width);
    height = getHeight(height);

    let positionObj = {
      _id: component._id,
      changes: {
        text: {
          value: component.component.text.value
        },
        position: {
          x: position[0],
          y: position[1],
        },
        size: {
          width: width,
          height: height,
        }
      }
    };

    let changesCopy = this.props.changes;
    changesCopy.push(positionObj);
    this.props.setChanges(changesCopy);
  };

  enterEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  createDraggable = (component, index) => {
    const { text, position, size } = component.component;
    if (this.props.editMode) {
      return (
        <Draggable
          bounds="parent"
          handle={'.edit-move-handle'}
          onDrag={(event) => this.handleDrag(event, component)}
          onStart={(event) => this.handleStart(event, component)}
          onStop={(event) => this.handleStop(event, component)}
          key={index}
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
          key={index}
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
      <div className="page-content">
        {this.props.components.map((component, index) => {
            return (
              this.createDraggable(component, index)
            );
          })}
      </div>
    );
  }
}
