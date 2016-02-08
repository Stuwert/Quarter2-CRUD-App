var express = require('express');
var router = express.Router();

var db = require('../lib/authors')

/* GET authors listing. */
router.get('/', function(req, res, next) {
  db.returnAllAuthorsWithBooks(function(authors){
    res.render('authors/all', {authors: authors})
  })
});

router.get('/:id', function(req, res, next){
  db.returnOneAuthorWithBooks(req.params.id, function(author, books){
    res.render('authors/one', {author: author, books: books})
  })
})

module.exports = router;
