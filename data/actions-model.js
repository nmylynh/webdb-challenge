const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const mappers = require('./mappers');

module.exports = {
  get: function(id) {
    let query = db('actions');

    if (id) {
      return query
        .where({ id })
        .first()
        .then(action => mappers.actionToBody(action));
    }

    return query.then(actions => {
      return actions.map(action => mappers.actionToBody(action));
    });
  },
  insert: function(action) {
    return db('actions')
      .insert(action)
      .then(([id]) => this.get(id));
  },
  update: function(id, changes) {
    return db('actions')
      .where({ id })
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  remove: function(id) {
    return db('actions')
      .where({ id })
      .del();
  },
};
