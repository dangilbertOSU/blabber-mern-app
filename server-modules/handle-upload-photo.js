const crypto = require('crypto');
const mime = require('mime-types');
const multer  = require('multer');

let Post = require('../post.model.js');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client-side/public/uploads');
  },

  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  },
});

let upload = multer({ storage: storage });

const uploadPhoto = (app) => {
  let obj = {};

  app.post('/api/uploadphoto', upload.single('photo_file'), (req, res) => {
    obj = { url: req.file.filename, x: 0, y: 0 };
    let post = new Post(obj);
    post.save()
      .then(post => {
        res.redirect('/');
      })
      .catch(err => {
        res.status(400).send('adding a post has failed.');
      });
  });

};

module.exports = uploadPhoto;
