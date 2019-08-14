const express = require('express');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

// Cookie parser
const authorize = require('./server-modules/handle-authorization.js');

app.get('/checkToken', authorize, (req, res) => {
  res.status(200).json({ username: req.username });
});

// Connect to mongo database
require('./server-modules/handle-mongo-connect.js');

//Handle Login
require('./server-modules/handle-login.js')(app);

//Handle Register
require('./server-modules/handle-register.js')(app);

// Load user setPage
require('./server-modules/load-user-pages.js')(app);

// Load single page
require('./server-modules/load-single-page.js')(app);

// Load posts
require('./server-modules/handle-load-posts.js')(app);

// Add Page
require('./server-modules/handle-add-page.js')(app);

// Add Post
require('./server-modules/handle-add-post.js')(app);

app.get('/users/:userId', authorize, (req, res) => {
  res.send(req.params);
});

// Update Post
require('./server-modules/handle-update.js')(app);

// Remove Post
require('./server-modules/handle-remove-post.js')(app);

// Upload photo
require('./server-modules/handle-upload-photo.js')(app);

// handle * pages
let pathName = (__dirname + '/client-side/build/index.html');

require('./server-modules/handle-other-page-requests.js')(app, pathName);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
