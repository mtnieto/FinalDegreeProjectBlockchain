var express = require('express');
var router = express.Router();

const SUCCCODE = 200
const ERRCODE = 400

/* GET home page. */
router.get('/', function(req, res) {
  res.send('hello')
});

module.exports = router;
