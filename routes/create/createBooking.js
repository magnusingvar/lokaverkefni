const express    = require('express');
const path = require('path');
const createBooking = require('../../db/create/booking');
const router = express.Router();
const readUser = require('../../db/read/readUser');
const dbFile = path.join(__dirname, '../../db/database.db');
const validSession = require('../functions/userSession');

router.post('/', async (req, res) => {
    try {
        const user = validSession(req.session);
        if (req.session.validSession) {
            const userId = readUser(dbFile, user).id;
            createBooking(dbFile, req.query.id, userId, req.query.checkin, req.query.checkout);
            res.render('error', { title: 'Success', status:'Success', msg: 'Room booked successfully', user});
        } else {
            res.redirect('/login');
        }
    } catch (e) {
        res.redirect('/');
    }
});

module.exports = router;