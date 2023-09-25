const Database = require('better-sqlite3');

module.exports = function readRooms(dbFile, checkin, checkout, people, orderby) {
    const db = new Database(dbFile);
    const sql = db.prepare(`
        SELECT *
        FROM rooms
        WHERE occupancy = ?
        AND id NOT IN (
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
        ) ${orderby}
    `);
            
    const rooms = sql.all(people, checkin, checkin, checkout, checkout, checkin, checkout, checkout);
    db.close();
    return rooms;
};
