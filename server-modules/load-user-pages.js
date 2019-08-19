let Post = require('../post.model.js');

loadUserPages = (app) => {
  app.get('/api/:username/pages', (req, res) => {

    const { username } = req.params;

    if (username !== 'null') {
      Post.findOne({ username: username }, (err, user) => {
        if (err) console.log(err);
        if (user) {
          res.json(user.pages);
        } else {
          res.status(404).json({ message: `No page data found for user ${username}` });
        }
      });
    }
  });
};

module.exports = loadUserPages;
