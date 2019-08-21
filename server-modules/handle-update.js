const express = require('express');
const app = express();

let Post = require('../post.model.js');

updatePost = (app) => {
  app.put('/api/update', (req, res) => {

    const array = req.body;
    array.map((item, index) => {
      console.log(item._id);
      console.log(item.changes);
      Post.updateOne({ 'contents._id': item._id },
      { $push: { 'contents.$': item.changes } }, (err, result) => {
        err ? console.log(err) : console.log(result);
      });
    });

    res.sendStatus(200);
  });
};

module.exports = updatePost;
