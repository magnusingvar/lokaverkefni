const express = require('express');
const router = express.Router();
const path = require('path');
const readRooms = require('../../db/read/readRooms');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    let where = 'WHERE bookings.id IS NULL';

    const checkin = req.query.checkin;
    const checkout = req.query.checkout;
    const people = req.query.people;
    
    const rooms = readRooms(dbFile, req.query.checkin, req.query.checkout, req.query.people);

    const header = 'Rooms';

    // Check if user is logged in
    if (req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('read/rooms', { title: 'Rooms', user, userPrivilege, header, rooms, checkin, checkout });
    } else {
        const userPrivilege = readUser(dbFile, user);
        res.render('read/rooms', { title: 'Rooms', user, userPrivilege, rooms, checkin, checkout });
    }
});

module.exports = router;