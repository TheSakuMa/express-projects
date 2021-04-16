const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/', function (req, res, next) {
  const emailAddress = req.body.email_address;
  const password = req.body.user_pass;
  let id = "";
  UserModel.findOne({ 'email_address': emailAddress }).select('password')
    .then(function (findOneResult) {
      id = findOneResult._id;
      return bcrypt.compare(password, findOneResult.password);
    })
    .then(function (comparisonResult) {
      if (comparisonResult) {
        req.session.user_id = id;
        res.redirect('/');
      } else {
        res.render('index', { title: 'Express', user: null, errMessage: 'メールアドレスまたはパスワードが正しくありません。' });
      }
    }).catch(function (err) {
      console.error(err);
    });
});

module.exports = router;