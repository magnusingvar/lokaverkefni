const Database = require('better-sqlite3');

module.exports = function createImage(dbFile, src) {
    const db = new Database(dbFile);  
    const sql = db.prepare(`
    INSERT INTO images
    (src) VALUES (?);
    `);
    const image = sql.run(src);
    const lastId = image.lastInsertRowid;
    db.close();
    return lastId;
};