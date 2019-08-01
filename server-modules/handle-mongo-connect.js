const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const mongoUser = process.env.mongoUser;
const mongoPassword = process.env.mongoPass;

let Post = require('../post.model.js');
let User = require('../user.model.js')

const mongoURL = `mongodb://${mongoUser}:${mongoPassword}@paprplanemongo-shard-00-00-wy4yv.mongodb.net:27017,paprplanemongo-shard-00-01-wy4yv.mongodb.net:27017,paprplanemongo-shard-00-02-wy4yv.mongodb.net:27017/PaprPlaneDB?ssl=true&replicaSet=PaprPlaneMongo-shard-0&authSource=admin&retryWrites=true`;

mongoose.connect(mongoURL, { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
  console.log('MongoDB database connection successful');
});

exports.login = (user, plainTextPassword, req, res) => {
  Post.findOne({ username: user }, function (err, obj) {
    if(obj){
      const hash = obj.password;
      bcrypt
      .compare(plainTextPassword, hash, (err, response) => {
        if(err) {
          console.log(err)
        }
        else {
          if(response == true){
            res.send("LOGGED IN")
          }
        }
      })
    }
  });
}

exports.register = (user, plainTextPassword, req, res) => {
  Post.findOne({ username: user }, function (err, obj) {
    if(obj){
      res.send('User already exists');
    }
    else{
      const saltRounds = 10;

      bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(plainTextPassword, salt);
      })
      .then(hash => {
        const userObj = { username: user, password: hash }
        let post = new Post(userObj);
        post.save()
          .then(post => {
            res.send('User has been created');
          })
          .catch(err => {
            console.error(err);
          })
      })
      .catch(err => console.error(err.message));
    }
  });
}
