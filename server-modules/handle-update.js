const express = require('express');
const app = express();

let Post = require('../post.model.js');

updatePost = (app) => {
  app.put('/api/update', (req, res) => {
    req.body.map((object) => {
      Post.findOneAndUpdate({ _id: object.id },
      {
        x: object.x,
        y: object.y,
        width: object.width,
        height: object.height,
      }, (err, result) => {
        (err === null) ? console.log('updated') : console.log(err);
      });
    });

    res.sendStatus(200);
  });
};

module.exports = updatePost;
