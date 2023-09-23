const Database = require('better-sqlite3');

module.exports = function updateRoom(dbFile, id, occupancy, beds, ppn, description) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  UPDATE rooms SET occupancy = ?,
  beds = ?, ppn = ?,
  description = ?
  WHERE id = ?`);
  sql.run(occupancy, beds, ppn, description, id)
  db.close();
}