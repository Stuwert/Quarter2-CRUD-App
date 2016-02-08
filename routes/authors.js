var express = require('express');
var router = express.Router();

var db = require('../lib/authors')

/* GET authors listing. */
router.get('/', function(req, res, next) {
  db.returnAllAuthorsWithBooks(function(authors){
    res.render('authors/all', {authors: authors})
  })
});

module.exports = router;
