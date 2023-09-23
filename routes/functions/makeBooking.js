const express    = require('express');
const path = require('path');
const booking = require('../../db/create/booking');
const userBooking = require('../../db/create/')
const router = express.Router();
const readUser = require('../../db/read/readUser');
const dbFile = path.join(__dirname, '../../db/database.db');
const validSession = require('./userSession');

router.post('/', (req, res) => {

    const user = validSession(req.session);
    if (req.session.validSession) {
        const userId = readUser(dbFile, user).id;
        booking(dbFile, req.query.id, userId, req.query.checkin, req.query.checkout);

        res.send('success')
    } else {
        res.redirect('/login');
    }
});

module.exports = router;