var express = require('express');
var router = express.Router();

var books = require('../lib/books')
var validator = require('../lib/validations')


/* GET all books. */
router.get('/', function(req, res, next) {
  if(req.query.genre){
    books.returnFilters(function(genres){
      books.returnSomeBooks(req.query.genre, 'genre', function(books){
        res.render('books/all', {books: books, length: books.length, genres: genres})
      })
    })
  }else {
    books.returnFilters(function(genres){
      books.returnAllBooksWithAuthors(function(books){
        res.render('books/all', {books : books, length: books.length, genres: genres})
      })
    })
  }
});

router.get('/new', function(req, res, next){
  books.returnAuthors(function(authors){
    res.render('forms/book', {authors: authors, action:'/books'})
  })
})

router.post('/:id/delete', function(req, res, next){
  books.deleteBook(req.params.id, function(){
    res.redirect('/books')
  })
})

router.get('/:id/delete', function(req, res, next){
  books.returnOneBook(req.params.id, function(book, authors){
    res.render('books/one', {book: book, authors: authors, del: true})
  })
})

router.post('/', function(req, res, next){
  var validated = validator.validateBook(req.body);
  if(validated.length > 0){
    books.returnAuthors(function(authors){
      res.render('forms/book', {book: req.body, validation: validated, authors : authors, action:'/books' })
    })
  }
  books.createNewBook(req.body, function(bookid){
    res.redirect('/books/' + bookid)
  })
})

router.get('/filter', function(req, res, next){

})

router.get('/:id', function(req, res, next){
  books.returnOneBook(req.params.id, function(book, authors){
    res.render('books/one', {book: book, authors: authors})
  })
})

router.get('/:id/edit', function(req, res, next){
  books.returnOneBook(req.params.id, function(book, authors){
    books.returnAuthors(function(authorz){
      res.render('forms/book', {book: book, action: '/books/' + req.params.id, authors: authorz})
    })
  })
})

router.post('/:id/', function(req, res, next){
  var validated = validator.validateBook(req.body);
  if(validated.length > 0){
    books.returnOneBook(req.params.id, function(book, authors){
      books.returnAuthors(function(authorz){
        res.render('forms/book', {book: req.body, validation: validated, authors: authorz , action:'/books' })
      })
    })
  }else{
    books.updateBook(req.params.id, req.body, function(){
      res.redirect('/books/' + req.params.id)
    })
  }
} )


module.exports = router;
