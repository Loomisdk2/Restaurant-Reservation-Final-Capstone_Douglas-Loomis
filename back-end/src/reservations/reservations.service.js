const knex = require("../db/connection");

async function create(reservation) {
  const newReservation = await knex("reservations as r")
    .insert(reservation)
    .returning("*");
  return newReservation[0];
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

//updates status
async function update(reservation_id, status) {
  const updated = await knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .returning("*");
  return updated[0];
}

function list() {
  return knex("reservations")
    .select("*")
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_date");
}

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNotIn("status", ["finished", "cancelled"])
    .orderBy("reservations.reservation_time");
}

function finish(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status: "finished" });
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

//updates modified reservation
async function modify(reservation_id, reservation) {
  const updated = await knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update(reservation, "*")
    .returning("*");
  return updated[0];
}

module.exports = {
  create,
  read,
  update,
  list,
  listByDate,
  finish,
  search,
  modify,
};