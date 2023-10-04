SELECT
    name
FROM
    sqlite_master
WHERE
    type = 'table' AND
    name NOT LIKE 'sqlite_%';

.tables

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    userPrivilege INTEGER NOT NULL DEFAULT 'user',
    verifiedEmail INTEGER DEFAULT 0
);

CREATE TABLE rooms (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    occupancy INTEGER NOT NULL,
    beds INTEGER NOT NULL,
    bedType TEXT NOT NULL,
    ppn INTEGER NOT NULL,
    description TEXT
);

CREATE TABLE roomTypes (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL UNIQUE
);

CREATE TABLE bookings (
    id INTEGER PRIMARY KEY,
    idRoom INTEGER,
    idUser INTEGER,
    checkin TEXT NOT NULL,
    checkout TEXT NOT NULL,
    isPaid INTEGER,
    userBooked TEXT NOT NULL,
    FOREIGN KEY (idRoom) REFERENCES rooms (id) ON DELETE CASCADE,
    FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE (idRoom, idUser, checkin, checkout)
);

CREATE TABLE menu (
    id INTEGER PRIMARY KEY,
    menuType TEXT NOT NULL,
    name TEXT NOT NULL
);

INSERT INTO menu (menuType, name) VALUES ('breakfast', 'test');

UPDATE users SET userPrivilege = "administrator"
WHERE id = 1

SELECT *
FROM rooms
WHERE rooms.suitableFor >= 3
AND id NOT IN (
    SELECT idRoom
    FROM bookings
    WHERE (
        2023-09-17 >= checkin AND 2023-09-18 < checkout
    ) OR (
        2023-09-17 > checkin AND 2023-09-18 <= checkout
    ) OR (
        2023-09-17 <= checkin AND 2023-09-18 >= checkout
    )
) OR id NOT IN (
    SELECT idRoom
    FROM bookings
    WHERE checkout <= 2023-09-18
) AND suitableFor = 3

SELECT rooms.id, rooms.numberOfBeds,
rooms.pricePerNight,
bookings.checkin, bookings.checkout FROM rooms 
INNER JOIN bookings
ON bookings.idRoom = rooms.id
INNER JOIN users
ON bookings.idUser = users.id
WHERE bookings.idUser = 1

SELECT * FROM users;
SELECT * FROM rooms;
SELECT * FROM roomTypes;
SELECT * FROM bookings;
SELECT * FROM menu

DELETE FROM users WHERE id = 1

DROP TABLE users;
DROP TABLE rooms;
DROP TABLE roomTypes;
DROP TABLE bookings;
DROP TABLE menu;