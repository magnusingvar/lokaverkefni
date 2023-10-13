const Database = require('better-sqlite3');

module.exports = function updateRoom(dbFile, id, type, occupancy, beds, bedType, ppn, description) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  UPDATE rooms SET type = ?, 
  occupancy = ?, beds = ?, 
  bedType = ?, ppn = ?,
  description = ?
  WHERE id = ?`);
  sql.run(type, occupancy, beds, bedType, ppn, description, id);
  db.close();
};