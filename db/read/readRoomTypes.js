const Database = require('better-sqlite3');

module.exports = function readRoomTypes(dbFile) {
    const db = new Database(dbFile);
    const sql = db.prepare(`
      SELECT id, type
      FROM roomTypes
      `);
    const types = sql.all();
    db.close();
    return types;
};