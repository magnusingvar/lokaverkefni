const express = require('express');
const router = express.Router();
const path = require('path');
const booking = require('../../db/create/createBooking');
const dbFile = path.join(__dirname, '../../db/database.db');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');

router.get('/', async (req, res) => {
    try {
        const user = validSession(req.session);
        if (req.session.validSession) {
            const userId = readUser(dbFile, user).id;
            const unpaidBookings = booking.getUnpaidBookings(dbFile, userId);

            res.json({ unpaidBookings });
        } else {
            const unpaidBookings = {}
            res.json({ unpaidBookings });
        }
    } catch (error) {
        console.error('Error checking unpaid bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;