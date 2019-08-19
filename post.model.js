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

let Page = new Schema({
  title: { type: String },
  description: { type: String },
  date_created: { type: String },
  contents: {
    component: {
      text: {
        value: { type: String },
        textId: { type: String },
      },
      position: {
        x: { type: Number },
        y: { type: Number },
      },
      size: {
        width: { type: Number },
        height: { type: Number },
      }
    }
  },
  comments: [Comment]
});

let Post = new Schema({
  username: { type: String },
  pages: [Page],
});

module.exports = mongoose.model('Post', Post);
