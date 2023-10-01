const express    = require('express');
const path = require('path');
const createBooking = require('../../db/create/createBooking');
const router = express.Router();
const readUser = require('../../db/read/readUser');
const dbFile = path.join(__dirname, '../../db/database.db');
const validSession = require('../functions/userSession');


router.post('/', async (req, res) => {

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDateTime)


    try {
        const user = validSession(req.session);
        if (req.session.validSession) {
            
            // const userId = readUser(dbFile, user).id;
            // createBooking(dbFile, req.query.id, userId, req.query.checkin, req.query.checkout);
            res.render('error', { title: 'Success', status:'Success', msg: 'Room booked successfully', user});
        } else {
            res.redirect('/login');
        }
    } catch (e) {
        res.send('error')
        // res.redirect('/');
    }
});

module.exports = router;