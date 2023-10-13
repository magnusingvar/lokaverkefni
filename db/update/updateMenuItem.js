const Database = require('better-sqlite3');

module.exports = function updateMenuItem(dbFile, type, name, id) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  UPDATE menu SET menuType = ?, name = ?
  WHERE id = ?`);
  sql.run(type, name, id);
  db.close();
};