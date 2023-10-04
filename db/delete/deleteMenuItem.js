const Database = require('better-sqlite3');

module.exports = function deleteMenuItem(dbFile, idMenuItem) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  DELETE FROM menu 
  WHERE id = ?
  `);
  sql.run(idMenuItem);
  db.close();
};