var express = require('express');
var router = express.Router();

var books = require('../lib/books')
var validator = require('../lib/validations')


/* GET all books. */
router.get('/', function(req, res, next) {
  if(req.query.genre || req.query.title){
    if (req.query.genre){
      books.returnFilters(function(genres){
        books.returnSomeBooks(req.query.genre, 'genre', function(books){
          res.render('books/all', {books: books, length: books.length, genres: genres, user: req.cookies.username, authlevel: req.cookies.authlevel})
        })
      })
    }else{
      books.returnFilters(function(genres){
        books.returnSomeBooks(req.query.title, 'title', function(books){
          res.render('books/all', {books: books, length: books.length, genres: genres, user: req.cookies.username, authlevel: req.cookies.authlevel})
        })
      })
    }
  }else {
    books.returnFilters(function(genres){
      books.returnAllBooksWithAuthors(function(books){
        res.render('books/all', {books : books, length: books.length, genres: genres, user: req.cookies.username, authlevel: req.cookies.authlevel})
      })
    })
  }
});

router.get('/:id', function(req, res, next){
  if (req.params.id === 'new'){
    next();
  }
  books.returnOneBook(req.params.id, function(book, authors){
    res.render('books/one', {book: book, authors: authors, user: req.cookies.username, authlevel: req.cookies.authlevel})
  })
})

router.use(function(req, res, next){
  if (req.cookies.authlevel > 3){
    next();
  }else{
    res.redirect('/')
  }
})

router.get('/new', function(req, res, next){
  books.returnAuthors(function(authors){
    res.render('forms/book', {authors: authors, action:'/books', user: req.cookies.username, authlevel: req.cookies.authlevel})
  })
})

router.post('/:id/delete', function(req, res, next){
  books.deleteBook(req.params.id, function(){
    res.redirect('/books')
  })
})

router.get('/:id/delete', function(req, res, next){
  books.returnOneBook(req.params.id, function(book, authors){
    res.render('books/one', {book: book, authors: authors, del: true, user: req.cookies.username, authlevel: req.cookies.authlevel})
  })
})

router.post('/', function(req, res, next){
  var validated = validator.validateBook(req.body);
  if(validated.length > 0){
    books.returnAuthors(function(authors){
      res.render('forms/book', {book: req.body, validation: validated, authors : authors, action:'/books', user: req.cookies.username, authlevel: req.cookies.authlevel })
    })
  }
  books.createNewBook(req.body, function(bookid){
    res.redirect('/books/' + bookid)
  })
})

router.get('/:id/edit', function(req, res, next){
  books.returnOneBook(req.params.id, function(book, authors){
    books.returnAuthors(function(authorz){
      console.log(authors);
      res.render('forms/book', {booksauthors: authors, book: book, action: '/books/' + req.params.id, authors: authorz, user: req.cookies.username, authlevel: req.cookies.authlevel})
    })
  })
})

router.post('/:id/', function(req, res, next){
  var validated = validator.validateBook(req.body);
  if(validated.length > 0){
    books.returnOneBook(req.params.id, function(book, authors){
      books.returnAuthors(function(authorz){
        res.render('forms/book', {book: req.body, validation: validated, authors: authorz , action:'/books', user: req.cookies.username, authlevel: req.cookies.authlevel })
      })
    })
  }else{
    books.updateBook(req.params.id, req.body, function(){
      res.redirect('/books/' + req.params.id)
    })
  }
} )


module.exports = router;
