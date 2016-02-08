var knex = require('../db/knex');

module.exports = {

  returnAllBooks: function(callback){
    Books().select().then(function(books){
      callback(books);
    })
  },

  returnAllAuthorsForBook: function(bookid, callback){
    Book_Authors().from('book_authors').where('book_authors.book_id', bookid).leftJoin('books', 'book_authors.book_id', 'books.id').leftJoin('authors', 'authors.id', 'book_authors.author_id').then(function(allinfo){
      callback(allinfo);
    })
  }

}


function Books(){
  return knex('books')
}

function Authors(){
  return knex('authors');
}

function Book_Authors(){
  return knex('book_authors');
}
