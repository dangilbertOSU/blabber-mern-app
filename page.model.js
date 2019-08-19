const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;

let Comment = new Schema({
  id: { type: ObjectId, required: true },
  comment: { type: String },
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

module.exports = mongoose.model('Page', Page);
