const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  username: { type: String },
  pages: {
    page: {
      id: { type: String },
      date_created: { type: String },
      contents: {
        component: {
          text_content: {
            paragraph: { type: String },
          },
        },
      },
    },
  },
});

module.exports = mongoose.model('Post', Post);
