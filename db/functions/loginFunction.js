const Database = require('better-sqlite3');

module.exports = function loginUser(dbFile, email) {
    const db = new Database(dbFile);
    const sql = db.prepare('SELECT email, password FROM users WHERE email = ?');
    const user = sql.get(email);
    db.close();
    return user;
};