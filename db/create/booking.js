const Database = require('better-sqlite3');

module.exports = function createBooking(dbFile, idRoom, idUser, checkin, checkout) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO bookings (idRoom, idUser, checkin, checkout) VALUES (?, ?, ?, ?);');
  const booking = sql.run(idRoom, idUser, checkin, checkout);
  const lastId = booking.lastInsertRowid; 
  
  db.close();
  return lastId
};