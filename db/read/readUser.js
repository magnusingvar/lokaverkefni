const Database = require('better-sqlite3');

module.exports = function getUserInfo(dbFile, email) {
    const db = new Database(dbFile);
    const sql = db.prepare(`
    SELECT id, firstName, lastName, email, userPrivilege, verifiedEmail 
    FROM users WHERE email = ?`);
    const userInfo = sql.get(email);
    db.close();
    return userInfo;
};