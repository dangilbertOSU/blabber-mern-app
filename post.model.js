const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  username: { type: String },
  pages: {
    page: {
      page_id: { type: String },
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
    },
  },
});

module.exports = mongoose.model('Post', Post);
