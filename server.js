const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const mongoose = require('mongoose');
const multer  = require('multer')
const path = require('path');
const router = express.Router();
const crypto = require('crypto');
const mime = require('mime-types')

const app = express();
const PORT = 4000;

let Post = require('./post.model.js');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

const mongoURL = 'mongodb://dannondarko:seedarkly1@paprplanemongo-shard-00-00-wy4yv.mongodb.net:27017,paprplanemongo-shard-00-01-wy4yv.mongodb.net:27017,paprplanemongo-shard-00-02-wy4yv.mongodb.net:27017/PaprPlaneDB?ssl=true&replicaSet=PaprPlaneMongo-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(mongoURL, { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
  console.log('MongoDB database connection successful');
})

app.get('/api/posts', (req, res) => {
  Post.find(function(err, posts) {
    if(err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  });
});

app.post('/api/add', (req, res) => {
  let post = new Post(req.body);
  post.save()
    .then(post => {
      res.status(200).json({'post': 'post added successfully'});
    })
    .catch(err => {
      res.status(400).send('adding a post has failed.');
    })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// router.route('/remove').post((req, res) => {
//   let post = new Post(req.body);
//   console.log("req.body: ", req.body);
//   post.remove()
//     .then(post => {
//       res.status(200).json({'post': 'post removed successfully'});
//     })
//     .catch(err => {
//       res.status(400).send('adding a post has failed.');
//     })
// });
//
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     crypto.pseudoRandomBytes(16, function (err, raw){
//       cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
//     });
//   }
// });
//
// let upload = multer({ storage: storage });

//
// router.route('/uploadphoto').post(upload.single('photo_file'), (req, res) => {
//   console.log('received request');
//   res.send();
// });


// app.use('/posts', router);

app.listen(process.env.PORT || PORT, () => {
  console.log('Server is listening on some port lmao')
});
