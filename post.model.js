const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  url: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: String,
  },
  paragraph: {
    message: {
      type: String,
    },
    date: {
      type: String,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
  },
  heading: {
    message: {
      type: String,
    },
    date: {
      type: String,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
  },
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
});

module.exports = mongoose.model('Post', Post);
