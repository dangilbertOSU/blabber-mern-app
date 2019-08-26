const jwt = require('jsonwebtoken');
const secret = 'allyouneedisfudge';

let Token = require('../token.model.js');

const withAuth = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  Token.findOne({ token }, (err, tokenFound) => {
    if (err) {
      console.log(err);
    } else if (!tokenFound) {
      if (!token) {
        res.status(401).send('Unauthorized: No token provided');
      } else {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            res.status(401).send('Unauthorized: Invalid token');
          } else {
            req.username = decoded.username;
            next();
          }
        });
      }
    } else if (tokenFound) {
      res.status(401).send('Unauthorized: Invalid token');
    }
  });
};

module.exports = withAuth;
