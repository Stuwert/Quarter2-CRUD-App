var express = require('express');
var router = express.Router();

var db = require('../lib/authors')

/* GET authors listing. */
router.get('/', function(req, res, next) {
  var pagenum = req.query.page > 1 ? req.query.page : 1;
  db.returnAllAuthors(function(authorslength){
    db.returnAllAuthorsWithBooks(pagenum, function(authors){
      var pages = Math.round(authorslength.length / 5 + 0.5)
      res.render('authors/all', {authors: authors, length: authorslength.length, pages: pages})
    })
  })
});

router.get('/:id', function(req, res, next){
  db.returnOneAuthorWithBooks(req.params.id, function(author, books){
    res.render('authors/one', {author: author, books: books})
  })
})

module.exports = router;
