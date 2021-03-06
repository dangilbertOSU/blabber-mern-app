const express = require('express');
const app = express();

let Post = require('../post.model.js');

removePost = (app) => {
  app.post('/api/delete', (req, res) => {
    console.log('req.body: ', req.body);
    let post = new Post(req.body);
    post.remove()
      .then(post => {
        res.status(200).json({ post: 'post removed successfully' });
      })
      .catch(err => {
        res.status(400).send('removing a post has failed.');
      });
  });
};

module.exports = removePost;
