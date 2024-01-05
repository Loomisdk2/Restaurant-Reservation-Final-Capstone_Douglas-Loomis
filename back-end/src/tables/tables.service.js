const knex = require("../db/connection");

// CRUDL functions
async function create(table) {
  const newTables = await knex("tables").insert(table).returning("*");
  return newTables[0];
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function list() {
  return knex("tables").select("*").orderBy("tables.table_name");
}

module.exports = { create, read, list };