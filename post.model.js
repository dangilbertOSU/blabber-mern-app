const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  picture: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: String
  }
});

module.exports = mongoose.model('Post', Post)
