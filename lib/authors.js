var knex = require('../db/knex');

module.exports = {
  returnAllAuthors: function(callback){
    Authors().select().then(function(authors){
      callback(authors)
    })
  },
  returnAllAuthorsWithBooks: function(callback){
    Authors().from('authors').leftJoin('book_authors', 'book_authors.author_id', 'authors.id')
    .leftJoin('books', 'book_authors.book_id', 'books.id')
    .then(function(authors){
      callback(newAuthorArray(authors));
    })
  },
  returnOneAuthorWithBooks: function(id, callback){
    Authors().where('id', id).first().then(function(author){
      Book_Authors().where('author_id', id).from('book_authors').leftJoin('books', 'books.id', 'book_authors.book_id').then(function(books){
        callback(author, books)
      })
    })
  },
  createAuthor: function(obj, callback){
    Authors().where({first_name : obj.first_name, last_name : obj.last_name}).then(function(response){
      if(response.length === 0){
        Authors()
        .insert({
          first_name: obj.first_name,
          last_name: obj.last_name,
          portrait_url: obj.portrait_url,
          bio: obj.bio
        })
        .returning('id')
        .then(function(id){
          callback(id)
        })
      } else{
        callback(response[0].id);
      }
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


function newAuthorArray(array){
  var newArray = [];
  array.forEach(function(item){
    var existingNumber = containsBookId(newArray, item.author_id)
    if(newArray.length === 0 || existingNumber === -1){
      newArray.push({
        id: item.author_id,
        name: item.first_name + " " + item.last_name,
        image: item.portrait_url,
        bio: item.bio,
        books: [{
          title: item.title,
          id: item.book_id
        }]
      })
    }else{
      newArray[existingNumber].books.push({
        title: item.title,
        id: item.book_id
      })
    }
  })
  return newArray;
}

function containsBookId(array, number){
  var bool = -1;
  array.forEach(function(item, i){
    if (item.id === number){
      bool = i;
    }
  })
  return bool;
}
