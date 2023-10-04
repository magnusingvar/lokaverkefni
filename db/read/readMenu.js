const Database = require('better-sqlite3');

module.exports = function readMenu(dbFile, menuType1, menuType2) {
    const db = new Database(dbFile);
    const sql = db.prepare(`
      SELECT id, menuType, name
      FROM menu
      WHERE menuType = ? 
      OR menuType = ?`);
    const menu = sql.all(menuType1, menuType2);
    db.close();
    return menu;
};