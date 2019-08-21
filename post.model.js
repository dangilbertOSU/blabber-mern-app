const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

let Comment = new Schema({
  comment: { type: String },
  date: { type: Date, default: Date.now },
  id: { type: ObjectId, required: true },
  name: { type: String },
  replies: [this],
});

let Component = new Schema({
  id: { type: ObjectId, required: true },
  text: {
    value: { type: String },
    id: { type: ObjectId },
  },
  position: {
    x: { type: Number },
    y: { type: Number },
  },
  size: {
    width: { type: Number },
    height: { type: Number },
  },
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
