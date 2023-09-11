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
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    userPrivilege INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rooms (
    id INTEGER PRIMARY KEY,
    suitableFor INTEGER NOT NULL,
    numberOfBeds INTEGER NOT NULL,
    pricePerNight INTEGER NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE booking (
    idRoom INTEGER,
    bookingNumber TEXT NOT NULL,
    bookedFrom DATE,
    bookedTo DATE,
    FOREIGN KEY (idRoom) REFERENCES rooms (id)
);

CREATE TABLE roomBooking (
    idRoom INTEGER,
    idUser INTEGER,
    FOREIGN KEY (idRoom) REFERENCES rooms (id),
    FOREIGN KEY (idUser) REFERENCES users (id)
);

DROP TABLE roomBooking

INSERT INTO roomBooking (idBooking, idRoom, idUser, bookedFrom, bookedTo) VALUES (1, 1, 1, '2023-09-12', '2023-09-13')
INSERT INTO roomBooking (idBooking, idRoom, idUser) VALUES (3, 2, 2)

SELECT * FROM roomBooking

UPDATE users SET userPrivilege = 1
WHERE id = 1

DROP TABLE users
DROP TABLE rooms

.tables