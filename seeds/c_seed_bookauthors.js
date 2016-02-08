
exports.seed = function(knex, Promise) {
  return db('authors').select().then(function(authors){
    return db('books').select().then(function(books){
      return Promise.join(
        // Deletes ALL existing entries
        knex('book_authors').del(),

        // Inserts seed entries
        knex('book_authors').insert({book_id: books[0].id, author_id: authors[0].id}),
        knex('book_authors').insert({book_id: books[1].id, author_id: authors[1].id}),
        knex('book_authors').insert({book_id: books[2].id, author_id: authors[2].id}),
        knex('book_authors').insert({book_id: books[3].id, author_id: authors[3].id}),
        knex('book_authors').insert({book_id: books[4].id, author_id: authors[3].id}),
        knex('book_authors').insert({book_id: books[5].id, author_id: authors[3].id}),
        knex('book_authors').insert({book_id: books[0].id, author_id: authors[4].id}),
        knex('book_authors').insert({book_id: books[0].id, author_id: authors[5].id})
      );
    })
  })


};
