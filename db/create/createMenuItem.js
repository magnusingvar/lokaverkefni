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

// function createMenuItem(dbFile, name) {
//     const db = new Database(dbFile);  
//     const sql = db.prepare(`
//     INSERT INTO menuItems
//     (name) VALUES (?);
//     `);
//     const menuItem = sql.run(name);
//     const lastId = menuItem.lastInsertRowid;
//     db.close();
//     return lastId;
// };

// function insertIntoMenuMenuItems(dbFile, idMenu, idMenuItems) {
//     const db = new Database(dbFile);  
//     const sql = db.prepare(`
//     INSERT INTO menusMenuItems
//     (idMenu, idMenuItems) VALUES (?, ?);
//     `);
//     const menuMenuItem = sql.run(idMenu, idMenuItems);
//     const lastId = menuMenuItem.lastInsertRowid;
//     db.close();
//     return lastId;
// };


// module.exports = {
//     createMenuItem,
//     insertIntoMenuMenuItems
// };