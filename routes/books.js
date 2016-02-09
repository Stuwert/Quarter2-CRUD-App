var express = require('express');
var router = express.Router();

var books = require('../lib/books')
var validator = require('../lib/validations')


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
    res.render('forms/book', {authors: authors})
  })
})

router.post('/', function(req, res, next){
  var validated = validator.validateBook(req.body);
  if(validated.length > 0){
    books.returnAuthors(function(authors){
      res.render('forms/book', {book: req.body, validation: validated, authors : authors })
    })
  }
  books.createNewBook(req.body, function(bookid){
    res.redirect('/books/' + bookid)
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
