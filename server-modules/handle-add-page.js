const express = require('express');
const app = express();

let Post = require('../post.model.js');
let Page = require('../page.model.js');

addPage = (app) => {
  app.post('/api/addPage', (req, res) => {
    const { username, page } = req.body;
    console.log('page: ', page);
    Post.findOneAndUpdate({ username }, { $push: { pages: page } }, (err, result) => {
      err ? console.log(err) : console.log(result);
    });
  });
};

module.exports = addPage;
