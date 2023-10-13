const Database = require('better-sqlite3');
const cron = require('node-cron');

function createBooking(dbFile, idRoom, idUser, checkin, checkout, isPaid, userBooked) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO bookings (idRoom, idUser, checkin, checkout, isPaid, userBooked) VALUES (?, ?, ?, ?, ?, ?);');
  const booking = sql.run(idRoom, idUser, checkin, checkout, isPaid, userBooked);
  const lastId = booking.lastInsertRowid; 
  
  db.close();
  return lastId;
}

function markAsPaid(dbFile, idBooking) {
  const db = new Database(dbFile);
  const sql = db.prepare('UPDATE bookings SET isPaid = 1 WHERE id = ?');
  const booking = sql.run(idBooking);

  db.close();
  
  return booking;
}

function getUnpaidBookings(dbFile, idUser) {
  const db = new Database(dbFile);
  const sql = db.prepare('SELECT bookings.id, bookings.idRoom, bookings.idUser, bookings.checkin, bookings.checkout, bookings.userBooked FROM bookings INNER JOIN users ON bookings.idUser = users.id WHERE users.id = ? AND bookings.isPaid = 0')
  const unpaidBookings = sql.get(idUser)

  db.close();

  return unpaidBookings;
};

module.exports = {
  createBooking,
  markAsPaid,
  getUnpaidBookings,
};