const Database = require('better-sqlite3');

module.exports = function readRoom(dbFile, idMenuItem) {
    const db = new Database(dbFile);
    const sql = db.prepare(`
      SELECT id, menuType, name 
      FROM menu
      WHERE id = ?`);
    const menuItem = sql.get(idMenuItem);
    db.close();
    return menuItem;
};