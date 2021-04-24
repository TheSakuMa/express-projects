const express = require('express');
const router = express.Router();
const session = require('express-session');
const UserModel = require('../models/userModel');

router.get('/', function (req, res, next) {
  res.render('add-friend', { title: '友達を追加する', errMessage: null, users: null });
});

router.route('/search-user')
  .get(function (req, res, next) {
    res.redirect('/add-friend');
  })
  .post(function (req, res, next) {
    if (!req.session.user_id) {
      res.redirect('/');
    } else {
      // elseに入れないと、[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client と怒られる
      const userName = req.body.user_name;
      UserModel.find({ name: { $regex: userName + '.*', $options: 'i' } }, function (err, users) {
        if (err) {
          console.error(err);
        } else {
          res.render('add-friend', { title: '友達を追加する', errMessage: null, users: users });
        }
      });
    }
  });

module.exports = router;