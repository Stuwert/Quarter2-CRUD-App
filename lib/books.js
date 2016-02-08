var knex = require('../db/knex');

module.exports = {

  returnAllBooks: function(callback){
    Books().select().then(function(books){
      callback(books);
    })
  }

}


function Books(){
  return knex('books')
}
