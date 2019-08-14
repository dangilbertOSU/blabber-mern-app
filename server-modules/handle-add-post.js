const express = require('express');
const app = express();

let Post = require('../post.model.js');

addTest = (app) => {
  app.post('/api/addText', (req, res) => {
    const { username, pageId, component } = req.body;

    Post.findOne({ username: username }, (err, user) => {
      if (err) console.log(err);
      else {
        const pages = user.pages.toJSON();
        pages.map((page, index) => {
          if (page.page.page_id === pageId) {
            pages[index].page.contents.component === component;
            console.log(page);
          }
        });
      }
    });
  });
};

module.exports = addTest;
