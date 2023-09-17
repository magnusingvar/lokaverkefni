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
    pricePerNight INTEGER,
    image TEXT NOT NULL
);

-- CREATE TABLE bookings (
--     id INTEGER PRIMARY KEY,
--     idRoom INTEGER,
--     checkin DATE NOT NULL,
--     checkout DATE NOT NULL,
--     FOREIGN KEY (idRoom) REFERENCES rooms (id),
--     UNIQUE (idRoom, checkin, checkout)
-- );

CREATE TABLE bookings (
    id INTEGER PRIMARY KEY,
    idRoom INTEGER,
    checkin TEXT NOT NULL,
    checkout TEXT NOT NULL,
    FOREIGN KEY (idRoom) REFERENCES rooms (id),
    UNIQUE (idRoom, checkin, checkout)
);

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

UPDATE users SET userPrivilege = 1
WHERE id = 1

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
) 

SELECT * FROM rooms
LEFT JOIN bookings
ON rooms.id = bookings.idRoom
AND bookings.dateFrom <= "2023-09-17"
AND bookings.dateTo >= "2023-09-20"
WHERE 
bookings.id IS NULL


SELECT * FROM rooms
WHERE rooms.id NOT IN (
    SELECT idRoom
    FROM bookings
    wHERE dateFrom <= "2023-09-18"
    AND dateTo > "2023-09-19"
)

DROP TABLE bookings;
DROP TABLE roomUserBookings


SELECT * FROM bookings

SELECT *
FROM rooms
WHERE (
    check_in_date > 'selected_check_out_date' OR
    check_out_date < 'selected_check_in_date'
) OR (
    room_number NOT IN (
        SELECT room_number
        FROM room_bookings
        WHERE check_in_date BETWEEN 'selected_check_in_date' AND 'selected_check_out_date'
        OR check_out_date BETWEEN 'selected_check_in_date' AND 'selected_check_out_date'
    )
);