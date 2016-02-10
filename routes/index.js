var express = require('express');
var cookieParser = require('cookie-parser')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('splash', {user: req.cookies.username});
});

module.exports = router;
