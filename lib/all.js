var knex = require('../db/knex');

module.exports = {

    returnAllFiltered(query, callback){
      Books().select().then(function(books){
        Authors().select().then(function(authors){
          console.log(books, " ", authors);
          callback(displayInfo(bookFilter(books, query), authorFilter(authors, query)))
        })
      })
    }

}

function bookFilter(books, query){
  return books.filter(function(book){
    var bool = false;
    query.forEach(function(queryitem){
      var querylowercase = queryitem.toLowerCase(), titlelowercase = book.title.toLowerCase();
      if(titlelowercase.includes(querylowercase)){
        bool = true;
      }
    })
    return bool;
  })
}

function authorFilter(authors, query){
  return authors.filter(function(author){
    var bool = false;
    query.forEach(function(queryitem){
      var querylowercase = queryitem.toLowerCase(), firstlowercase = author.first_name.toLowerCase(), lastlowercase = author.last_name.toLowerCase();
      if(firstlowercase.includes(querylowercase) || lastlowercase.includes(querylowercase))
      bool = true;
    })
    return bool;
  })
}

function displayInfo(books, authors){
  var displayArray = [];
  books.forEach(function(book){
    displayArray.push({
      display: book.tile,
      id: book.id,
      type: 'book',
      image: book.image_url,
      description: book.description
    })
  })
  authors.forEach(function(author){
    displayArray.push({
      display: author.first_name + " " + author.last_name,
      id: author.id,
      type: 'author',
      image: author.portrait_url,
      description: author.bio,
    })
  })
  return displayArray;
}

function Books(){
  return knex('books');
}

function Authors(){
  return knex('authors');
}
