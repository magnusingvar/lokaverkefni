const express = require('express');
const router = express.Router();
const path = require('path');
// const readRooms = require('../../db/read/readRooms');
const readRooms = require('../../db/read/readBookingDate');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    let where = 'WHERE rooms.id';
    const rooms = readRooms(dbFile, where);
    const header = 'Rooms';

    // Check if user is logged in
    if (req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('read/rooms', { title: 'Rooms', user, userPrivilege, header, rooms });
    } else {
        const userPrivilege = readUser(dbFile, user);
        res.render('read/rooms', { title: 'Rooms', user, userPrivilege, rooms });
    }
});

module.exports = router;