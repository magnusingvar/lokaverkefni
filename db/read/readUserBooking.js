const Database = require('better-sqlite3');

module.exports = function readUserBooking(dbFile, id) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  SELECT rooms.id, rooms.type, rooms.occupancy,
  rooms.beds, rooms.ppn, rooms.description,
  bookings.id, bookings.idRoom,
  bookings.checkin, bookings.checkout
  FROM rooms 
  INNER JOIN bookings
  ON bookings.idRoom = rooms.id
  INNER JOIN users
  ON bookings.idUser = users.id
  WHERE bookings.idUser = ? AND bookings.isPaid = 1`);
  const bookings = sql.all(id);
  db.close();
  return bookings;
}