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
    userPrivilege INTEGER NOT NULL DEFAULT 'user'
);

DROP TABLE users
SELECT * FROM users

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


INSERT INTO roomTypes (type) VALUES ('Standard'), ('Deluxe')

SELECT * FROM roomTypes

DROP TABLE rooms

CREATE TABLE images (
    id INTEGER PRIMARY KEY,
    src TEXT,
);

CREATE TABLE roomsImages (
    id INTEGER,
    idRoom INTEGER NOT NULL,
    idImage INTEGER NOT NULL,
    PRIMARY KEY (id, idRoom, idImage),
    FOREIGN KEY (idRoom) REFERENCES rooms (id),
    FOREIGN KEY (idImage) REFERENCES images (id)
);

CREATE TABLE bookings (
    id INTEGER PRIMARY KEY,
    idRoom INTEGER,
    idUser INTEGER,
    checkin TEXT NOT NULL,
    checkout TEXT NOT NULL,
    FOREIGN KEY (idRoom) REFERENCES rooms (id) ON DELETE CASCADE,
    FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE (idRoom, idUser, checkin, checkout)
);

SELECT * FROM bookings

DROP TABLE images;
DROP TABLE bookings;

UPDATE users SET userPrivilege = "administrator"
WHERE id = 1

UPDATE users SET firstName = 'Test' WHERE id = 1

SELECT * FROM bookings
DROP TABLE bookings

SELECT rooms.id, rooms.numberOfBeds,
rooms.pricePerNight,
bookings.checkin, bookings.checkout FROM rooms 
INNER JOIN bookings
ON bookings.idRoom = rooms.id
INNER JOIN users
ON bookings.idUser = users.id
WHERE bookings.idUser = 1

SELECT * FROM rooms




CREATE TABLE userBooking (
    idUser INTEGER,
    idBooking INTEGER,
    PRIMARY KEY (idUser, idBooking),
    FOREIGN KEY (idUser) REFERENCES users (id),
    FOREIGN KEY (idBooking) REFERENCES bookings (id)
);

INSERT INTO userBooking (idUser, idBooking) VALUES (1, 1)

SELECT * FROM bookings
INNER JOIN userBooking ON
userBooking.idBooking = bookings.id
INNER JOIN rooms
ON bookings.idRoom = rooms.id
INNER JOIN users
ON userBooking.idUser = users.id
WHERE users.id = 1

SELECT * FROM userBooking
SELECT * FROM bookings

DROP TABLE userBooking;
DROP TABLE bookings;

-- CREATE TABLE bookings (
--     id INTEGER PRIMARY KEY,
--     idRoom INTEGER,
--     checkin DATE NOT NULL,
--     checkout DATE NOT NULL,
--     FOREIGN KEY (idRoom) REFERENCES rooms (id),
--     UNIQUE (idRoom, checkin, checkout)
-- );

SELECT * FROM rooms;
SELECT * FROM bookings

DROP TABLE rooms
DROP TABLE bookings

INSERT INTO bookings (idRoom, checkin, checkout)
VALUES (1, "2023-09-17", "2023-09-18");


INSERT INTO bookings (idRoom, dateFrom, dateTo)
VALUES (1, '2023-09-17', '2023-09-18');

INSERT INTO bookings (idRoom, dateFrom, dateTo)
VALUES (2, '2023-09-18', '2023-09-19');


INSERT INTO bookings (idRoom, bookingNumber, dateFrom, dateTo)
VALUES (1, 't12345', '2023-09-13', '2023-09-15');

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

DROP TABLE users
DROP TABLE rooms

.tables

SELECT * FROM rooms
SELECT * FROM bookings


INSERT INTO rooms (suitableFor) VALUES (3)

INSERT INTO bookings (idRoom, checkin, checkout)
VALUES (1, "2023-09-17", "2023-09-18")

DROP TABLE rooms;
DROP TABLE bookings;

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


DROP TABLE bookings;
DROP TABLE roomUserBookings
