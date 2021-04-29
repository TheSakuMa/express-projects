const express = require('express');
const router = express.Router();
const UserModel = require("../models/userModel");

router.get('/', function (req, res, next) {
    const userId = req.session.user_id;
    UserModel.find({ id: userId })
        .then(function (resultData) {
            console.log(resultData);
            res.render('create-room', { title: 'ルーム作成', friends: null, errMessage: null });
        })
        .catch(function (err) {
            console.error(err);
        });
});

router.post('/create', function (req, res, next) {

});

module.exports = router;