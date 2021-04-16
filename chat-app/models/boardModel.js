const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('./userModel');

const boardSchema = new Schema({
  participants: [String],
  messages: Map,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BoardModel', boardSchema);