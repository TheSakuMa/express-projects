const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('./userModel');

const boardSchema = new Schema({
  participants: [String],
  messages: [
    {
      body: String,
      user_id: String,
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now }
    }
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BoardModel', boardSchema);