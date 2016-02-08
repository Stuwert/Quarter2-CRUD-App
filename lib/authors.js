var knex = require('../db/knex');

module.exports = {

  returnAllAuthorsWithBooks: function(callback){
    Authors().from('authors').leftJoin('book_authors', 'book_authors.author_id', 'authors.id')
    .leftJoin('books', 'book_authors.book_id', 'books.id')
    .then(function(authors){
      callback(newAuthorsObj(authors))
    })
  },
  returnOneAuthorWithBooks: function(id, callback){
    Authors().where('id', id).first().then(function(author){
      Book_Authors().where('author_id', id).from('book_authors').leftJoin('books', 'books.id', 'book_authors.book_id').then(function(books){
        console.log(books);
        callback(author, books)
      })
    })
  }

}

function Books(){
  return knex('books');
}

function Book_Authors(){
  return knex('book_authors')
}

function Authors(){
  return knex('authors');
}

function newAuthorsObj(array){
  var obj = {};
  array.forEach(function(item){
    if (item["author_id"] in obj){
      obj[item['author_id']].books.push([item["title"], item["id"]])
    }else{
      obj[item["author_id"]] = {
        first_name : item["first_name"],
        last_name : item["last_name"],
        bio: item["bio"],
        portrait: item["portrait_url"],
        books: [[item["title"], item['id']]]
      }
    }
  })
  return obj;
}
