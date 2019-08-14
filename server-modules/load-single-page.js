let Post = require('../post.model.js');

loadSinglePage = (app) => {
  app.get('/api/:username/pages/:pageid', (req, res) => {
    const { username, pageid } = req.params;

    if (username !== 'null') {
      Post.findOne({ username: username }, (err, user) => {
        if (err) console.log(err);
        if (user) {
          const pages = user.pages.toJSON();
          pages.map((page, index) => {
            if (page.page.page_id === pageid) {
              res.status(200).json(page.page);
            }
          });
        }
      });
    }
  });
};

module.exports = loadSinglePage;
