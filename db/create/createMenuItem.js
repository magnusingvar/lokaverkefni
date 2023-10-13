const Database = require('better-sqlite3');

module.exports = function createMenu(dbFile, menuType, name) {
    const db = new Database(dbFile);  
    const sql = db.prepare(`
    INSERT INTO menu
    (menuType, name) VALUES (?, ?);
    `);
    const menu = sql.run(menuType, name);
    db.close();
};