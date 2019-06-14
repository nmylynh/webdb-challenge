exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', function(tbl) {
      tbl.increments();

      
      tbl
        .string('description', 255)
        .notNullable();
      tbl
        .text('notes')
        .notNullable();
      tbl
        .boolean('completed')
        .defaultTo(false);
  
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('actions');
  };
  