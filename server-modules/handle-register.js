const bcrypt = require('bcrypt');
let Post = require('../post.model.js');

handleRegister = (app) => {
  app.post('/api/register', (req, res) => {
    let plainTextPassword = req.body.password;
    const register = require('./handle-mongo-connect.js').register;
    register(req.body.username, plainTextPassword, req, res);
  });
};

module.exports = handleRegister;
