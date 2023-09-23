const Database = require('better-sqlite3');

module.exports = function deleteRoom(dbFile, idRoom) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  DELETE FROM rooms WHERE id = ?
  `);
  sql.run(idRoom);
  db.close();
};