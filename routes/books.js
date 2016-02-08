var express = require('express');
var router = express.Router();

var books = require('../lib/books')


/* GET all books. */
router.get('/', function(req, res, next) {
  books.returnAllBooksWithAuthors(function(books){
    res.send(books);
  })
});


module.exports = router;
