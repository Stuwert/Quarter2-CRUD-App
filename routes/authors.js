var express = require('express');
var router = express.Router();

var db = require('../lib/authors')
var validator = require('../lib/validations')




/* GET authors listing. */
router.get('/', function(req, res, next) {
  if (req.query.name){
    var queryArray = req.query.name.split(" ");
    db.someAuthors(queryArray, function(authors){
      console.log(authors);
      res.render('authors/all', {authors: authors, length: authors.length})
    })
  }else{
    db.returnAllAuthorsWithBooks(function(authors){
      console.log(authors);
      res.render('authors/all', {authors: authors, length: authors.length})
    })
  }
});

router.post('/', function(req, res, next){
  var validated = validator.validateBook(req.body);
  if(validated.length > 0){
    res.render('forms/author', {action: '/authors', author: req.body})
  }else{
    db.createAuthor(req.body, function(id){
      res.redirect('/authors/' + id);
    })
  }
})

router.get('/new', function(req, res, next){

  res.render('forms/author', {action: '/authors'})
})

router.post('/:id', function(req, res, next){
  var validated = validator.validateBook(req.body);
  if(validated.length > 0){
    res.render('forms/author', {action: '/authors/' + req.params.id, author: req.body})
  }else{
    db.updateAuthor(req.params.id, req.body, function(){
      res.redirect('/authors/' + req.params.id)
    })
  }
})

router.get('/:id/edit', function(req, res, next){
  db.returnOneAuthorWithBooks(req.params.id, function(author, books){
    db.returnAllBooks(function(bookz){
      console.log(books);
      res.render('forms/author', {authorsbooks: books, author: author, books: bookz, action: '/authors/' + req.params.id })
    })
  })
})

router.get('/:id', function(req, res, next){
  db.returnOneAuthorWithBooks(req.params.id, function(author, books){
    res.render('authors/one', {author: author, books: books})
  })
})

router.get('/:id/delete', function(req, res, next){
  db.returnOneAuthorWithBooks(req.params.id, function(author, books){
    res.render('authors/one', {author: author, books: books, del: true})
  })
})

router.post('/:id/delete', function(req, res, next){
  db.deleteAuthor(req.params.id, function(){
    res.redirect('/authors')
  })
})



module.exports = router;
