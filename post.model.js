const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

let Comment = new Schema({
  comment: { type: String },
  date: { type: Date, default: Date.now },
  name: { type: String },
  replies: [this],
});

let Component = new Schema({
  component: {
    text: {
      value: { type: String },
      id: { type: ObjectId },
    },
    url: {
      value: { type: String },
    },
    position: {
      x: { type: Number },
      y: { type: Number },
    },
    size: {
      width: { type: Number },
      height: { type: Number },
    },
  }
});

let Page = new Schema({
  title: { type: String },
  description: { type: String },
  date_created: { type: Date, default: Date.now },
  contents: [Component],
  comments: [Comment]
});

let Post = new Schema({
  username: { type: String },
  pages: [Page],
});

module.exports = mongoose.model('Post', Post);
