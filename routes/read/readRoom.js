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
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    const urlParams = req.url;

    try {
        const userBooking = [];
        const room = readRoom(dbFile, req.query.id);
        const checkin = req.query.checkin;
        const checkout = req.query.checkout;
        const people = req.query.people;

        let one_day = 1000 * 60 * 60 * 24
        const ciDate = new Date(checkin)
        const coDate = new Date(checkout)
        
        const checkinDate = ciDate.getTime();
        const checkoutDate = coDate.getTime();

        const price = room.ppn;
        const nights = Math.round(checkoutDate - checkinDate)/one_day;
        const totalPrice = price * nights;
        
        if (urlParams.includes('checkin', 'checkout', 'people')) {
            if (room != undefined && checkin != checkout && checkin >= formattedToday && !(checkout <= checkin) && totalPrice > 0) {
                if (req.session.validSession) {
                    const userId = readUser(dbFile, user).id; 
                    const userBooking = readUserBooking(dbFile, userId);
                    const userPrivilege = readUser(dbFile, user).userPrivilege;
                    res.render('read/room', { title: `${room.type} Room`, user, userPrivilege, room, checkin, checkout, people, nights, operation: 'book', userBooking, totalPrice });
                } else {
                    res.render('read/room', { title: `${room.type} Room`, user, room, checkin, checkout, people, nights, operation: 'book', userBooking, totalPrice });
                }
            } else {
                res.status(400).render('error', { title:'Error', status: 400, msg: 'Bad Request', user});
            }  
        } else {
            if (req.session.validSession) {
                const userPrivilege = readUser(dbFile, user).userPrivilege;
                res.render('read/room', { title: `${room.type} Room`, user, userPrivilege, room, checkin, checkout, nights, operation: 'view', userBooking });
            } else {
                res.render('read/room', { title: `${room.type} Room`, user, room, checkin, checkout, nights, operation: 'view', userBooking });        
            }
        }
    } catch (e) {
        res.status(404).render('error', { title:'Error', status: 404, msg: 'Page not found!', user });
    }
});

module.exports = router;