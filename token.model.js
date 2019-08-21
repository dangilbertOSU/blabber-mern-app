const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Token = new Schema({
  token: { type: String },
});

module.exports = mongoose.model('Token', Token);
