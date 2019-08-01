const crypto = require('crypto');
const mime = require('mime-types');
const multer  = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw){
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

let upload = multer({ storage: storage });

const uploadPhoto = (app) => {
  app.post('/api/uploadphoto', upload.single('photo_file'), (req, res) => {
    res.send();
  });
}

module.exports = uploadPhoto;
