const express = require('express');
const router = express.Router();
const path = require('path');
const readRooms = require('../db/read/readRooms');
const readUser = require('../db/read/readUser');
const validSession = require('./functions/userSession');
const dbFile = path.join(__dirname, '../db/database.db');

router.get('/rooms', (req, res) => {
    const user = validSession(req.session);

    if (req.session.validSession) {
        const rooms = readRooms(dbFile, '', '', '', '');
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('read/rooms', { title: 'Rooms', user, userPrivilege, rooms, operation: 'edit'});
    } else {
        res.redirect('/');
    }
})

router.get('/menu', (req, res) => {
    res.send('edit menu page');
});

module.exports = router;