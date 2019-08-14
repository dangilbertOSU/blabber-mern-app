const jwt = require('jsonwebtoken');
const secret = 'allyouneedisfudge';

let UserSchema = require('../user.model.js');

handleLogin = (app) => {
  app.post('/api/authenticate', (req, res) => {
    const { username, password } = req.body;
    UserSchema.findOne({ username }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again',
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect username or password',
          });
      } else {
        user.isCorrectPassword(password, user.password, (err, same) => {
          if (err) {
            console.log(err);
            res.status(500)
              .json({ error: 'Internal error please try again' });
          } else if (!same) {
            res.status(401)
              .json({ error: 'Incorrect username or password' });
          } else {
            // Issue token
            const payload = { username };
            const token = jwt.sign(payload, secret, {
              expiresIn: '30m',
            });

            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    });
  });
};

module.exports = handleLogin;
