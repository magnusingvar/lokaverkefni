const express = require('express');
const router = express.Router();
const path = require('path');
const getBooking = require('../../db/read/readUserBooking');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const header = 'My bookings';

    if (req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        const userId = readUser(dbFile, user).id; 
        const bookings = getBooking(dbFile, userId);
        res.render('read/bookings', { title: 'My Bookings', user, userPrivilege, bookings, msg: `You have not made any bookings` });
    } else {
        res.render('read/bookings', { title: 'My Bookings', user, bookings: 0, msg: `To manage or see bookings please login` });
    } 
});

module.exports = router;