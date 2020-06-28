
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients_test').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients_test').insert([
        {id: 1, client_name: 'Test_Client1'},
        {id: 2, client_name: 'Test_Client2'},
        {id: 3, client_name: 'Test_Client3'}
      ]);
    });
};
