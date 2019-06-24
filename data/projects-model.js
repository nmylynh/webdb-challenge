const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectActions,
};

function get(id) {
  let query = db('projects as p');

  if (id) {
    query.where('p.id', id).first();

    const promises = [query, this.getProjectActions(id)]; // [ projects, actions ]

    return Promise.all(promises).then(function(results) {
      let [project, actions] = results;

      if (project) {
        project.actions = actions;

        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  }

  return query.then(projects => {
    return projects.map(project => mappers.projectToBody(project));
  });
}

function insert(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => this.get(id));
}

function update(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
  return db('projects')
    .where({ id })
    .del();
}

function getProjectActions(projectId) {
  return db('actions') // give me actions
    .where('project_id', projectId) // where project_id matches projectId
    .then(actions => actions.map(action => mappers.actionToBody(action))); //then, for each action, add completed: false or true depending on integer 
}
