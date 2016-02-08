var express = require('express');
var router = express.Router();

var books = require('../lib/books')


/* GET all books. */
router.get('/', function(req, res, next) {
  books.returnAllBooksWithAuthors(function(books){
    res.render('books/all', {books : books})
  })
});

router.get('/:id', function(req, res, next){
  books.returnOneBook(req.params.id, function(book, authors){
    console.log('book is ', book);
    res.render('books/one', {book: book, authors: authors})
  })
})


module.exports = router;
