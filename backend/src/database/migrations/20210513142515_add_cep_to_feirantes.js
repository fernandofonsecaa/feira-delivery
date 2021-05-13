
exports.up = function(knex, Promise) {
  knex.schema.table('feirantes', function(table){
      table.number('cep').notNullable()
  })
};

exports.down = function(knex, Promise) {
  knex.schema.table('feirantes', function(table){
      table.dropColumn('cep')
  })
};
