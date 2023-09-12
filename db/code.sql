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

CREATE TABLE bookings (
    id INTEGER PRIMARY KEY,
    bookingNumber TEXT NOT NULL,
    dateFrom TEXT,
    dateTo TEXT
);

INSERT INTO bookings (bookingNumber, dateFrom, dateTo)
VALUES ('t12345', '2023-09-13', '2023-09-14');

CREATE TABLE roomUserBookings (
    idRoom INTEGER,
    idUser INTEGER,
    idBooking INTEGER,
    PRIMARY KEY (idRoom, idUser, idBooking),
    FOREIGN KEY (idRoom) REFERENCES rooms (id),
    FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (idBooking) REFERENCES bookings (id)
);

DROP TABLE roomUserBookings

INSERT INTO roomUserBookings (idRoom, idUser, idBooking)
VALUES (2, 1, 2);

SELECT * FROM rooms

UPDATE users SET userPrivilege = 1
WHERE id = 1

DROP TABLE users
DROP TABLE rooms

.tables