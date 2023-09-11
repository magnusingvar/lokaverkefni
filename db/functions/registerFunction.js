const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');

module.exports = function registerUser(dbFile, firstName, lastName, email, password) {
    const db = new Database(dbFile);
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    const sql = db.prepare('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)');
    sql.run(firstName, lastName, email, hash);
    db.close();
    return hash;
};