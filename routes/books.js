var express = require('express');
var router = express.Router();

var books = require('../lib/books')


/* GET all books. */
router.get('/', function(req, res, next) {
  var pagenum = req.query.page > 1 ? req.query.page : 1;
  books.returnAllBooks(function(bookslength){
    books.returnAllBooksWithAuthors(pagenum, function(books){
      res.render('books/all', {books : books, length: bookslength.length})
    })
  })
});

router.get('/:id', function(req, res, next){
  books.returnOneBook(req.params.id, function(book, authors){
    console.log('book is ', book);
    res.render('books/one', {book: book, authors: authors})
  })
})


module.exports = router;
