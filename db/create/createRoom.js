const Database = require('better-sqlite3');

module.exports = function createEvent(dbFile, suitable, beds, price, image) {
    const db = new Database(dbFile);  
    const sql = db.prepare('INSERT INTO rooms(suitableFor, numberOfBeds, pricePerNight, image) VALUES (?, ?, ?, ?);');
    const room = sql.run(suitable, beds, price, image);
    const lastId = room.lastInsertRowid;
    db.close();
    return lastId;
};