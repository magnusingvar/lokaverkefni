const Database = require('better-sqlite3');

function readRooms(dbFile, checkin, checkout, people, orderby, page) {
    const perPage = 5; 
    const offset = (page - 1) * perPage;

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
        LIMIT ? OFFSET ?
    `);

            
    const rooms = sql.all(people, checkin, checkin, checkout, checkout, checkin, checkout, checkout, perPage, offset);
    db.close();
    return rooms;
};

function totalRooms(dbFile, checkin, checkout) {
    const db = new Database(dbFile);
    
    const sql = db.prepare(`        
    SELECT COUNT (*) AS total
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
    )
    `);

    const result = sql.all(checkin, checkin, checkout, checkout, checkin, checkout, checkout);
    db.close();
    const total = result[0].total || 0;
    return parseInt(total, 10);
}

module.exports = {
    readRooms,
    totalRooms
}