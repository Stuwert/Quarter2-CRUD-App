var knex = require('../db/knex');

module.exports = {

  returnAllBooks: function(callback){
    Books().select().then(function(books){
      callback(books);
    })
  },
  returnAllBooksWithAuthors: function(page, callback){
    Book_Authors().from('book_authors').leftJoin('books', 'book_authors.book_id', 'books.id').leftJoin('authors', 'authors.id', 'book_authors.author_id').then(function(allinfo){
      callback(newBookArray(allinfo, (page - 1)*5));
    })
  },
  returnOneBook: function(id, callback){
    Books().where('id', id).first().then(function(book){
      Book_Authors().where('book_id', id).from('book_authors').leftJoin('authors', 'book_authors.author_id', 'authors.id').then(function(authors){
        callback(book, authors);
      })
    })
  },
  returnSomeBooks: function(query, parameter, callback){
    Book_Authors().where(query, parameter).from('book_authors').leftJoin('books', 'book_authors.book_id', 'books.id').leftJoin('authors', 'authors.id', 'book_authors.author_id').then(function(allinfo){
      callback(newBookArray(allinfo));
    })
  },
  returnAuthors: function(callback){
    Authors().select().then(function(authors){
      callback(authors);
    })
  },
  createNewBook: function(obj, callback){
    Books().where('title', obj.title).then(function(response){
      if(response.length === 0){
        Books()
        .insert({
          title: obj.title,
          genre: obj.genre,
          image_url: obj.image_url,
          description: obj.description
        })
        .returning('id')
        .then(function(id){
          var pushTo;
          if(typeof obj.authors === 'object'){
            pushTo = []
            obj.authors.forEach(function(item){
              pushTo.push({
                book_id: id[0],
                author_id: item
              })
            })
          }else{
            pushTo = {
              book_id: id[0],
              author_id: obj.authors
            }
          }
          Book_Authors().insert(pushTo).then(function(){
            callback(id);
          })
        })
      } else{
        callback('');
      }
    })
  },
  updateBook: function(id, obj, callback){
    console.log(id);
    Books().where('id', id).update({
      title: obj.title,
      genre: obj.genre,
      image_url: obj.image_url,
      description: obj.description
    }).then(function(){
      Book_Authors()
        .where('book_id', id)
        .del()
        .then(function(result){
          var pushTo;
          if(typeof obj.authors === 'object'){
            pushTo = []
            obj.authors.forEach(function(item){
              pushTo.push({
                book_id: id,
                author_id: item
              })
            })
          }else{
            pushTo = {
              book_id: id,
              author_id: obj.authors
            }
          }
          console.log(pushTo);
          Book_Authors().insert(pushTo).then(function(){
            callback();
          })
        })
      })
  }

}

function createAuthorLinks(authors, callback){

}

function newBookArray(array, filter){
  var newArray = [];
  array.forEach(function(item){
    var existingNumber = containsBookId(newArray, item.book_id)
    console.log(existingNumber);
    if(newArray.length === 0 || existingNumber === -1){
      newArray.push({
        id: item.book_id,
        title: item.title,
        genre: item.genre,
        image: item.image_url,
        description: item.description,
        authors: [{
          name: item.first_name + " " + item.last_name,
          id: item.author_id
        }]
      })
    }else{
      newArray[existingNumber].authors.push({
        name: item.first_name + " " + item.last_name,
        id: item.author_id
      })
    }
  })
  return newArray.splice(filter, 5);
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


function Books(){
  return knex('books')
}

function Authors(){
  return knex('authors');
}

function Book_Authors(){
  return knex('book_authors');
}
