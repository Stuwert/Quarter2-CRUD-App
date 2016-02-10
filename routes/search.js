var express = require('express');
var router = express.Router();

var all = require('../lib/all')

/* GET home page. */
router.get('/', function(req, res, next) {
  all.returnAllFiltered(req.query.terms.split(" "), function(results){
    res.render('search/all', {results: results})
  })
});

module.exports = router;
