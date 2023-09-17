const Database = require('better-sqlite3');

module.exports = function readRooms(dbFile, checkin, checkout, people) {
    const db = new Database(dbFile);
    const sql = db.prepare(
    `SELECT *
    FROM rooms
    WHERE id NOT IN (
        SELECT idRoom
        FROM bookings
        WHERE (
            ? >= checkin AND ? < checkout
        ) OR (
            ? > checkin AND ? <= checkout
        ) OR (
            ? <= checkin AND ? >= checkout
        )
    ) OR id NOT IN (
        SELECT idRoom
        FROM bookings
        WHERE checkout <= ?
    ) AND suitableFor = ?`);
    const rooms = sql.all(checkin, checkin, checkout, checkout, checkin, checkout, checkout, people);
    db.close();
    return rooms;
};
