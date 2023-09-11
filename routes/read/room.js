const express = require('express');
const router = express.Router();
const path = require('path');
const readRoom = require('../../db/read/readRoom');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    try {
        const room = readRoom(dbFile, req.query.id);
        console.log(room.suitableFor);
        // Check if user is logged in
        if (req.session.loggedIn) {
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            res.render('read/room', { title: 'Room suitable for ' + room.suitableFor, user, userPrivilege, room } );
        } else {
            const userPrivilege = readUser(dbFile, user);
            res.render('read/room', { title: 'Room suitable for ' + room.suitableFor, user, userPrivilege, room });
        }
    } catch (e) {
        res.render('error', { title: 'Error', status: 404, msg: 'Page not found!', user});
    }
});

module.exports = router;