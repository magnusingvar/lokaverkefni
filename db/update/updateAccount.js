const Database = require('better-sqlite3');

module.exports = function updateAccount(dbFile, id, firstName, lastName, email) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
  UPDATE users SET firstName = ?,
  lastName = ?, email = ?
  WHERE id = ?`);
  sql.run(firstName, lastName, email, id)
  db.close();
}