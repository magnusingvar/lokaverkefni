const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const readUser = require('../../db/read/readUser');
const booking = require('../../db/create/createBooking');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');
require('dotenv').config();

router.get('/checkAndDeleteUnpaidBookings', (req, res) => {
    booking.checkAndRemoveUnpaid();
    res.json({ message: 'Unpaid bookings checked and deleted.' });
});

router.get('/:booking', (req, res) => {
    const user = validSession(req.session);
    if (req.session.validSession) {
        try {
            const userId = readUser(dbFile, user);
            const today = new Date();
    
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const hours = String(today.getHours()).padStart(2, '0');
            const minutes = String(today.getMinutes()).padStart(2, '0');
            const seconds = String(today.getSeconds()).padStart(2, '0');
              
            // Create the formatted date and time string
            const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
            const bookingId = booking.createBooking(dbFile, req.query.id, userId.id, req.query.checkin, req.query.checkout, 0, formattedDateTime);
            
            const basket = jwt.sign(
                {
                    id: req.query.id,
                    type: req.query.type,
                    checkin: req.query.checkin,
                    checkout: req.query.checkout,
                    price: req.query.price,
                    idBooking: bookingId,
                },
                'token'
            );
    
            res.cookie('basket', basket, { maxAge: 10 * 60 * 1000, httpOnly: true });
            res.redirect('/checkout');
        } catch (e) {
            res.redirect('/');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const error = req.query.error;
    try { 
        if (req.session.validSession) {
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            const cookie = req.cookies['basket'];
            if (cookie != undefined) {
                const room = jwt.verify(cookie, 'token');
                const bookingId = room.idBooking;

                res.render('read/checkout', {title: 'Basket', user, userPrivilege, room, bookingId, error: '' });

                // if (error != 1) {
                //     res.render('read/checkout', {title: 'Basket', user, userPrivilege, room, bookingId, msg: '' });
                // } else {
                //     res.render('read/checkout', {title: 'Basket', user, userPrivilege, room, bookingId, msg: 'Please fill out all fields' });
                // }
            } else {
                res.render('read/checkout', {title: 'Basket', user, userPrivilege, room: ''});
            }
        } else {
            res.render('read/checkout', {title: 'Basket', user, room: ''});
        }
    } catch (e) {
        res.clearCookie('basket');
        res.redirect('/checkout');
    }
});

router.post('/', (req, res) => {
    const user = validSession(req.session);
    try {
        if (req.session.validSession) {
            const userId = readUser(dbFile, user);
            const cookie = req.cookies['basket'];
            const room = jwt.verify(cookie, 'token');
            const bookingId = room.idBooking;
            
            const name = req.body.name;
            const ccn = req.body.ccn;
            const cvc = req.body.cvc;
            const expire = req.body.expire;

            let errorMessage = '';

            if (!name.trim() || !ccn.trim() || !cvc.trim() || !expire.trim()) {
                errorMessage = 'Please fill out all fields';
            } else {
                booking.markAsPaid(dbFile, bookingId);
                let transport = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASSWORD
                    }
                });
        
                const mailOptions = {
                    from: '"Lokaverkefni" <magnuslokaverkefni@gmail.com>',
                    to: userId.email,
                    subject: 'Your booking',
                    text: 'Your booking was successful',
                    html: `You have booked the ${room.type} Room for $${room.price} from ${room.checkin} to ${room.checkout}`
                };
                
                transport.sendMail(mailOptions);
                
                res.clearCookie('basket');
                res.redirect('/');
            }

            const userPrivilege = readUser(dbFile, user).userPrivilege;
            res.render('read/checkout', {title: 'Basket', user, userPrivilege, room, bookingId, error: errorMessage });

        } else {
            res.redirect('/');
        }
    } catch (e) {
        res.clearCookie('basket');
        res.redirect('/checkout');
    }
});

module.exports = router;