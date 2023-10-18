const Database = require('better-sqlite3');

module.exports = function updateAccount(dbFile, firstName, lastName, id) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  UPDATE users 
  SET firstName = ?,
  lastName = ?
  WHERE id = ?`);
  sql.run(firstName, lastName, id)
  db.close();
};