
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.string('title');
    table.string('description');
    table.string('image_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
