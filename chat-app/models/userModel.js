const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: [true, 'ユーザ名が入力されていません'] },
  password: { type: String, required: [true, 'パスワードが入力されていません'] },
  email_address: { type: String, max: 100, required: [true, 'メールアドレスが入力されていません'] },
  self_introduction: { type: String, max: 300 },
  friends: [{ type: String, default: null }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserModel', User);