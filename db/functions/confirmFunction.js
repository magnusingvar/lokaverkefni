const Database = require('better-sqlite3');

module.exports = function confirmAccount(dbFile, id) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  UPDATE users 
  SET verifiedEmail = 1
  WHERE id = ?`);
  sql.run(id)
  db.close();
};