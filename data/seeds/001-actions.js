
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions')
        .insert([
          {
            id: 1, 
            description: 'Assassinate the koolaid man.', 
            notes: 'Be wary of sharp defenses. Body shatters on impact.',
            project_id: 1
          },
          {
            id: 2, 
            description: 'Have participants take 1 energy drink per hour for three days.',
            notes: 'Originally this study involved adderall, but due to unforseen circumstances the test substance has been removed.',
            project_id: 2
          },
          {
            id: 3, 
            description: 'Phase 1: Participants will point with their index and middle finger towards the eyes of another participant, and then return to point to their own eyes.',
            notes: 'Observe the reaction of the participant. How much alpha is too much alpha?',
            project_id: 3
          },
          {
            id: 4, 
            description: 'Phase 2: Participants will shout I AM THE CAPTAIN NOW',
            notes: 'Observe exchange of reactions. Who is truly the captain?',
            project_id: 3
          }
        ]);
    });
};
