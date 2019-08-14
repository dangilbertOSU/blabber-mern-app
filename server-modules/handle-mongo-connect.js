const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const mongoUser = process.env.mongoUser;
const mongoPassword = process.env.mongoPass;

let Post = require('../post.model.js');
let UserSchema = require('../user.model.js');

const secret = 'allyouneedisfudge';

const mongoURL = 'mongodb://dannondarko:seedarkly1@paprplanemongo-shard-00-00-' +
'wy4yv.mongodb.net:27017,paprplanemongo-shard-00-01-wy4yv.mongodb.net:27017,' +
'paprplanemongo-shard-00-02-wy4yv.mongodb.net:27017/PaprPlaneDB?ssl=true&replicaSet=' +
'PaprPlaneMongo-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(mongoURL, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
  console.log('MongoDB database connection successful');
});

exports.register = (user, plainTextPassword, req, res) => {
  const saltRounds = 10;

  UserSchema.findOne({ username: user }, function (err, obj) {
    if (obj) {
      res.json({ message: `${username} already exists.` });
    } else {
      bcrypt.genSalt(saltRounds).then(salt => {
        bcrypt.hash(plainTextPassword, salt);
      }).then(hash => {
        const userObj = { username: user, password: hash };
        const user = new UserSchema(userObj);
        user.save((err) => {
          if (err) {
            res.status(500)
              .send('Error registering new user please try again.');
          } else {
            res.status(200).send('Welcome to the club!');
          }
        });
      })
      .catch(err => res.send(err));
    }
  });
};
