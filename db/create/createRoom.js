const Database = require('better-sqlite3');

module.exports = function createRoom(dbFile, type, occupancy, beds, bedType, ppn, description) {
    const db = new Database(dbFile);  
    const sql = db.prepare(`
    INSERT INTO rooms
    (type, occupancy, beds, bedType, ppn, description)
    VALUES (?, ?, ?, ?, ?, ?);
    `);
    const room = sql.run(type, occupancy, beds, bedType, ppn, description);
    const lastId = room.lastInsertRowid;
    db.close();
    return lastId;
};