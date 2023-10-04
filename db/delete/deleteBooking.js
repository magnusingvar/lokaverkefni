const Database = require('better-sqlite3');

module.exports = function deleteBooking(dbFile, idBooking, idUser) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  DELETE FROM bookings 
  WHERE id = ? 
  AND idUser = ?`);
  const test = sql.run(idBooking, idUser);
  db.close();
  return test;
};