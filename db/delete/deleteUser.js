const Database = require('better-sqlite3');

module.exports = function deleteUser(dbFile, email) {
    const db = new Database(dbFile);
    const sql = db.prepare('DELETE from users WHERE email = ?');
    sql.run(email);
    db.close();
};