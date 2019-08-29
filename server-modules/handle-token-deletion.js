const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const secret = 'allyouneedisfudge';

let Token = require('../token.model.js');

deleteTokens = (app) => {

  let time = 1000 * 60 * 30;

  setTimeout(() => {
      time = 1000 * 60 * 30;
      Token.find({}, (err, tokens) => {
        if (err) console.log(err);
        tokens.forEach((token) => {
          jwt.verify(token.token, secret, (err, decoded) => {
            if (err) {
              Token.remove({ token: token.token }, (err) => console.log(err));
            }
          });
        });
      });
      deleteTokens();
    }, time);
};

module.exports = deleteTokens;
