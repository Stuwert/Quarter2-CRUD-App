var express = require('express');
var bcrypt = require('bcrypt');
var knex = require('../db/knex');
var router = express.Router();


/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res, next){
  Users().where('username', req.body.username).then(function(results){
    if(results.length  > 0){
      res.render('auth/signup', {message: "A user already has that username"})
    } else{
      Users().insert({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        authlevel: 4
      }).then(function(){
        res.redirect('/auth/signin')
      })
    }
  })
})

router.get('/signin', function(req, res, next){
  res.render('auth/signin')
})

router.post('/signin', function(req, res, next){
  Users().where('username', req.body.username).first().then(function(result){
    if(bcrypt.compareSync(req.body.password, result.password)){
      res.cookie('username', req.body.username, {httpOnly: true, secure: true})
      res.cookie('authlevel', req.body.authlevel, {httpOnly: true, secure: true})
      res.redirect('/')
    }else{
      res.render('auth/signin', {message: "Looks like you had the incorrect username or password"})
    }
  })
})

module.exports = router;

function Users(){
  return knex('users');
}
