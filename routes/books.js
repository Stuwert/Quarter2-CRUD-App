var express = require('express');
var router = express.Router();

var books = require('../lib/books')


/* GET all books. */
router.get('/', function(req, res, next) {
  var pagenum = req.query.page > 1 ? req.query.page : 1;
  books.returnAllBooks(function(bookslength){
    books.returnAllBooksWithAuthors(pagenum, function(books){
      var pages = Math.round(bookslength.length / 5 + 0.5);
      res.render('books/all', {books : books, length: bookslength.length, pages: pages})
    })
  })
});

router.get('/new', function(req, res, next){
  books.returnAuthors(function(authors){
    console.log(authors);
    res.render('forms/book', {authors: authors})
  })
})

router.get('/filter', function(req, res, next){
  var pagenum = req.query.page > 1 ? req.query.page : 1;
  if (req.query.genre){
    books.returnSomeBooks(req.query.genre, 'genre', function(books){
      res.render('books/all', {books: books, length: books.length})
    })
  }
  if(req.query.title){
    books.returnAllBooksWithAuthors(pagenum, function(books){
      books.filter(function(item){
        var bool = item.title.includes(req.query.title);
        return bool
      })
      res.render('books/all', {books: books, length: books.length})
    })
  }
})

router.get('/:id', function(req, res, next){
  books.returnOneBook(req.params.id, function(book, authors){
    console.log('book is ', book);
    res.render('books/one', {book: book, authors: authors})
  })
})


module.exports = router;
