const bcrypt = require("bcrypt");
let Post = require('../post.model.js');

handleLogin = (app) => {
  app.post('/api/login', (req, res) => {
    let plainTextPassword = req.body.password;
    const login = require('./handle-mongo-connect.js').login;
    login(req.body.username, plainTextPassword, req, res);
  })
}

module.exports = handleLogin;
