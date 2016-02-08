var knex = require('../db/knex');

module.exports = {

  returnAllBooks: function(callback){
    Books().select().then(function(books){
      callback(books);
    })
  },
  returnAllBooksWithAuthors: function(callback){
    Book_Authors().from('book_authors').leftJoin('books', 'book_authors.book_id', 'books.id').leftJoin('authors', 'authors.id', 'book_authors.author_id').then(function(allinfo){
      callback(newBookObj(allinfo));
    })
  },
  returnOneBook: function(id, callback){
    Books().where('id', id).first().then(function(book){
      Book_Authors().where('book_id', id).from('book_authors').leftJoin('authors', 'book_authors.author_id', 'authors.id').then(function(authors){
        callback(book, authors);
      })
    })
  }

}

function newBookObj(array){
  var obj = {};
  array.forEach(function(item){
    if (item["book_id"] in obj){
      obj[item["book_id"]].authors.push(item['first_name'] + ' ' + item['last_name']);
    }else{
      obj[item["book_id"]] = {
        book_image : item["image_url"],
        authors : [item["first_name"] + " " + item["last_name"]],
        description: item["description"],
        title: item['title'],
        genre: item['genre']
      }
    }
  })
  return obj;
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
