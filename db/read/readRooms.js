const Database = require('better-sqlite3');

module.exports = function readRooms(dbFile, where) {
    const db = new Database(dbFile);
    const sql = db.prepare(
        `SELECT id, suitableFor, 
    numberOfBeds, pricePerNight
    FROM rooms ${where}`);
    const rooms = sql.all();
    db.close();
    return rooms;
};