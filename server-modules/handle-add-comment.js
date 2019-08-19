const express = require('express');
const app = express();

let Post = require('../post.model.js');

addComment = (app) => {
  app.post('/api/addComment', (req, res) => {
    const { commentObj, id } = req.body;

    Post.updateOne({ 'pages._id': id },
    { $push: { 'pages.$.comments': commentObj } }, (err, result) => {
      err ? console.log(err) : console.log(result);
    });
  });
};

module.exports = addComment;
