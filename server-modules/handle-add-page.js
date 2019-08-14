const express = require('express');
const app = express();

let Post = require('../post.model.js');

addPage = (app) => {
  app.post('/api/addPage', (req, res) => {
    const { username, page } = req.body;
    let post = new Post(page);
    console.log('username: ', username);

    Post.updateOne({ username }, { $push: { pages: page } }, (err, user) => {
      (err === null) ? console.log('updated') : console.log(err);
    });
  });
};

module.exports = addPage;
