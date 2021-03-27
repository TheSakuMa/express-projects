var express = require('express');
var router = express.Router();
var pageInfo = require('../pageInfo');

const title = pageInfo.title;

/* SELECT BY KEY */
router.post('/:key', function(req, res, next) {
  const data = JSON.parse(req.body.hiddenData);
  const key = req.params.key;
  const newData = data[key]? data[key]: null;

  if (newData !== null) {
    res.render('index', { title: title, data: JSON.stringify(newData) });
  } else {
    res.render('index', { title: title, data: '指定したキーは存在しないか、値がありません。' });
  }
  
});

module.exports = router;