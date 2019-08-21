const express = require('express');
const app = express();

let Post = require('../post.model.js');

addText = (app) => {
  app.post('/api/addText', (req, res) => {
    const { username, pageId, component } = req.body;

    Post.updateOne({ 'pages._id': pageId },
    { $push: { 'pages.$.contents': component } }, (err, result) => {
      err ? console.log(err) : console.log(result);
    });

    // Post.findOne({ username: username }).select('pages').exec((err, pages) => {
    //   console.log(pages);
    // });
  });
};

module.exports = addText;
