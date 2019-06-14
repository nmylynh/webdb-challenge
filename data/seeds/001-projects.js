
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects')
        .insert([
          {
            id: 1, 
            name: '007 James Bond', 
            description: 'A super duper secret spy project'
          },
          {
            id: 2, 
            name: 'Insomnia', 
            description: 'How little sleep is too much no sleep?'
          },
          {
            id: 3, 
            name: 'Contemporary Captain', 
            description: 'A qualitative study on the meaning of I AM THE CAPTAIN NOW'
          }
        ]);
    });
};
