const Database = require('better-sqlite3');

module.exports = function readMenu(dbFile, menuName) {
    const db = new Database(dbFile);
    const sql = db.prepare(`
    SELECT menus.type, menuItems.name FROM menus 
    INNER JOIN menusMenuItems
    ON menus.id = menusMenuItems.idMenu
    INNER JOIN menuItems
    ON menuItems.id = menusMenuItems.idMenuItems
    WHERE menus.type = ?`);
    const menu = sql.all(menuName);
    db.close();
    return menu;
};