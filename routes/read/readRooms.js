const express = require('express');
const router = express.Router();
const path = require('path');
const readRooms = require('../../db/read/readRooms');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const checkin = req.query.checkin;
    const checkout = req.query.checkout;
    const people = req.query.people;

    const rooms = readRooms(dbFile, checkin, checkout, people);
    const header = 'Rooms';

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy + '-' + mm + '-' + dd;

    const form = {
        checkin: req.query.checkin,
        checkout: req.query.checkout
    };

    // Message for when room search query is invalid
    const msg = `Please try again,
    make sure the checkin date is not in the past and 
    that both the checkin and checkout field are filled 
    out correctly. Also make sure that the checkout
    date is not the same as the checkin date.`

    const url = req.url;

    if (url == '/') {
        if (req.session.validSession) {
            const rooms = readRooms(dbFile, '', '', '');
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            res.render('read/rooms', { title: 'Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, msg, form, operation: 'edit'});
        } else {
            const userPrivilege = readUser(dbFile, user);
            res.render('read/rooms', { title: 'Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, error: 'Please try again', msg, form, operation: 'edit'});
        }    
    } else {
        if (req.session.validSession) {
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            res.render('read/rooms', { title: 'Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, msg, form, operation: 'search'});
        } else {
            const userPrivilege = readUser(dbFile, user);
            res.render('read/rooms', { title: 'Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, error: 'Please try again', msg, form, operation: 'search'});
        }    
    }
});

module.exports = router;