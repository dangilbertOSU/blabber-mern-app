let Post = require('../post.model.js');

loadUserPages = (app) => {
  app.get('/api/:username/pages', (req, res) => {

    const { username } = req.params;

    if (username !== 'null') {
      Post.findOne({ username: username }, (err, pages) => {
        if (err) console.log(err);
        if (pages) {
          res.json(pages.pages);
        } else {
          res.status(404).json({ message: `No page data found for user ${username}` });
        }
      });
    }
  });
};

module.exports = loadUserPages;
