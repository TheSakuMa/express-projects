var express = require('express');
var router = express.Router();
var UserModel = require('../models/userModel');
var bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

// ユーザ登録画面の表示
router.get('/', function (req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('registration', {
      title: 'ユーザ登録',
      message: null,
      errorMessages: null
    });
  }
});

// ユーザ登録実行
router.post(
  '/registar',
  // express-validatorを利用したバリデーション
  validateInput(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // バリデーションで弾かれた場合の処理
      return res.render('registration', {
        title: 'ユーザ登録',
        message: null,
        errorMessages: errors.array()
      });
    }
    const userName = req.body.user_name;
    const emailAddress = req.body.email_address;
    const userPass = req.body.user_pass;
    const selfIntroduction = req.body.self_introduction;
    // 登録済みメールアドレスチェック
    UserModel.exists({ 'email_address': emailAddress }, function (err, result) {
      if (err) {
        console.error(err.message);
        res.render('error', { message: 'システムエラーが発生しました。', error: err });
      }
      if (result) {
        res.render('registration', {
          title: 'ユーザ登録',
          message: null,
          errorMessages: ['そのメールアドレスは既に登録されています。']
        });
      } else {
        // ハッシュ化
        const saltRounds = 10;
        bcrypt.hash(userPass, saltRounds)
          .then(function (hash) {
            return new UserModel({
              name: userName,
              password: hash,
              email_address: emailAddress,
              self_introduction: selfIntroduction
            });
          }).then(function (newUser) {
            // CREATE実行
            newUser.save(function (err) {
              if (err) {
                console.error(err.message);
                res.render('error', { message: 'システムエラーが発生しました', error: err });
              } else {
                res.render('registration', {
                  title: 'ユーザ登録',
                  message: 'ユーザ登録が完了しました。',
                  errorMessages: null
                });
              }
            });
          }).catch(function (err) {
            console.error(err.message);
            res.redirect('/');
          });
      }
    });
  });

// TODO ユーザ情報変更機能追加

// express-validatorを利用したバリデーションを関数として定義
function validateInput() {
  return [
    check('email_address').isEmail().withMessage('入力されたメールアドレスは、正しい形式ではありません。'),
    check('user_pass').isLength({ min: 5 }).withMessage('パスワードは、5文字以上で入力してください。'),
  ]
}

module.exports = router;