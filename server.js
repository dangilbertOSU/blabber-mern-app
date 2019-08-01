const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const passportLocal = require('passport-local');
const router = express.Router();

const app = express();
const port = process.env.PORT || 5000;

const mongoUser = process.env.mongoUser;
const mongoPassword = process.env.mongoPass;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client-side/build')));

// Connect to mongo database
require ('./server-modules/handle-mongo-connect.js');

//Handle Login
require ('./server-modules/handle-login.js')(app);

//Handle Register
require ('./server-modules/handle-register.js')(app);

// Load posts
require ('./server-modules/handle-load-posts.js')(app);

// Add Post
require ('./server-modules/handle-add-post.js')(app);

// Upload photo
require ('./server-modules/handle-upload-photo.js')(app);

// handle * pages
let pathName = (__dirname+'/client-side/build/index.html');
require ('./server-modules/handle-other-page-requests.js')(app, pathName);


app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
});
