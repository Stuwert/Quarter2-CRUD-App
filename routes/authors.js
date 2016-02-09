var express = require('express');
var router = express.Router();

var db = require('../lib/authors')
var validator = require('../lib/validations')




/* GET authors listing. */
router.get('/', function(req, res, next) {
  db.returnAllAuthorsWithBooks(function(authors){
    console.log(authors);
    res.render('authors/all', {authors: authors, length: authors.length})
  })
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

router.get('/:id', function(req, res, next){
  db.returnOneAuthorWithBooks(req.params.id, function(author, books){
    res.render('authors/one', {author: author, books: books})
  })
})



module.exports = router;
