exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(tbl) {
      tbl.increments();
  
      tbl
        .string('name', 255)
        .notNullable()
        .unique();
      tbl
        .text('description')
        .notNullable();
      tbl
        .boolean('completed')
        .defaultTo(false);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tbl');
  };
  