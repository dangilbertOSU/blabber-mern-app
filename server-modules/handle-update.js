const express = require('express');
const app = express();

let Post = require('../post.model.js');

updatePost = (app) => {
  app.put('/api/update', (req, res) => {

    const { pageChanges, pageId } = req.body;

    console.log(JSON.stringify(pageChanges));

    pageChanges.map((item, index) => {
      Post.update({ 'pages._id': pageId },
        {
          $set: {
            'pages.$.contents.$[i].component': item.changes
          }
        },
        {
          arrayFilters: [
            {
              'i._id': item._id
            }
          ]
        }, (err, result) => {
          err ? console.log('err:', err) : console.log('result: ', result);
        }
      );
    });

    res.sendStatus(200);
  });
};

module.exports = updatePost;
