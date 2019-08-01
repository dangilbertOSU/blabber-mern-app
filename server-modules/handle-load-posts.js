let Post = require('../post.model.js');

loadPosts = (app) => {
  app.get('/api/posts', (req, res) => {
    Post.find(function(err, posts) {
      if(err) {
        console.log(err);
      } else {
        res.json(posts);
      }
    });
  });
}

module.exports = loadPosts;
