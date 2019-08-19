let Post = require('../post.model.js');

loadSinglePage = (app) => {
  app.get('/api/:username/pages/:pageid', (req, res) => {
    const { username, pageid } = req.params;

    if (username !== 'null') {
      Post.findOne({ username: username }, (err, user) => {
        if (err) console.log(err);
        if (user) {
          user.pages.map((page, index) => {
            if (page._id.toString() === pageid) {
              const pageObj = { page: page, username: username };
              res.status(200).json(pageObj);
            }
          });
        }
      });
    }
  });
};

module.exports = loadSinglePage;
