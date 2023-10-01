const express = require('express');
const router = express.Router();
const path = require('path');
const readRoom = require('../../db/read/readRoom');
const readUser = require('../../db/read/readUser');
const readUserBooking = require('../../db/read/readUserBooking');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    try {
        const userBooking = [];
        const room = readRoom(dbFile, req.query.id);
        const checkin = req.query.checkin;
        const checkout = req.query.checkout;

        let one_day = 1000 * 60 * 60 * 24
        const ciDate = new Date(checkin)
        const coDate = new Date(checkout)
        
        const checkinDate = ciDate.getTime();
        const checkoutDate = coDate.getTime();

        const price = room.ppn;
        const nights = Math.round(checkoutDate - checkinDate)/one_day
        const totalPrice = price * nights;
        
        if (checkin && checkout != null) {
            if (room != undefined) {
                if (req.session.validSession) {
                    const userId = readUser(dbFile, user).id; 
                    const userBooking = readUserBooking(dbFile, userId);
                    const userPrivilege = readUser(dbFile, user).userPrivilege;
                    res.render('read/room', { title: 'Room suitable for', user, userPrivilege, room, checkin, checkout, nights, operation: 'book', userBooking, totalPrice});
                } else {
                    const userPrivilege = readUser(dbFile, user);
                    res.render('read/room', { title: 'Room suitable for', user, userPrivilege, room, checkin, checkout, nights, operation: 'book', userBooking, totalPrice});
                }
            }
        } else {
            if (req.session.validSession) {
                const userPrivilege = readUser(dbFile, user).userPrivilege;
                res.render('read/room', { title: 'Room suitable for', user, userPrivilege, room, checkin, checkout, nights, operation: 'view', userBooking});
            } else {
                const userPrivilege = readUser(dbFile, user);
                res.render('read/room', { title: 'Room suitable for', user, userPrivilege, room, checkin, checkout, nights, operation: 'view', userBooking});        
            }
        }
    } catch (e) {
        res.status(404);
        res.redirect('/error');
    }
});

module.exports = router;