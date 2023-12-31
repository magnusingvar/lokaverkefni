const Database = require('better-sqlite3');

module.exports = function readRoom(dbFile, idRoom) {
    const db = new Database(dbFile);
    const sql = db.prepare(`
      SELECT id, type,
      occupancy, beds,
      bedType, ppn,
      description FROM rooms
      WHERE id = ?`);
    const room = sql.get(idRoom);
    db.close();
    return room;
};