var express = require('express');
var router = express.Router();
var axios = require('axios');
var pageInfo = require('../pageInfo');

const title = pageInfo.title;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title, data: null });
});

router.post('/execute', function(req, res, next) {
  var url = req.body.url;
  axios.get(url)
  .then(function(response) {
    res.render('index', { title: title, data: JSON.stringify(response.data, null, "  ") });
    console.log(response.data);
  })
  .catch(function(err) {
    console.error(err);
    res.render('index', { title: title, data: 'エラーが発生しました。' });
  });
});

module.exports = router;
