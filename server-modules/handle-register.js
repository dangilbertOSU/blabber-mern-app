const bcrypt = require('bcrypt');
let UserSchema = require('../user.model.js');
let Post = require('../post.model.js');

handleRegister = (app) => {
  app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const user = new UserSchema({ username, password });
    const post = new Post({ username: username });
    user.save((err) => {
      if (err) {
        console.log(err);
        res.status(500)
          .send('Error registering new user please try again.');
      } else {
        post.save((err) => err ? console.log(err) : null);
        res.status(200).send('Registered');
      }
    });
  });
};

module.exports = handleRegister;
