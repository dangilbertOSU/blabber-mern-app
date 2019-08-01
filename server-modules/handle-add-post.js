const express = require('express');
const app = express();

let Post = require('../post.model.js');

addPost = (app) => {
  app.post('/api/add', (req, res) => {
    let post = new Post(req.body);
    post.save()
      .then(post => {
        res.status(200).json({'post': 'post added successfully'});
      })
      .catch(err => {
        res.status(400).send('adding a post has failed.');
      })
  });
}

module.exports = addPost;
