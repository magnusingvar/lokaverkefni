const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../db/read/readUser');
const validSession = require('./functions/userSession');
// const getRooms = require('../db/read/readRooms');
// const readUser = require('../db/read/readUser');
// const userLoggedIn = require('./functions/userSession');
const dbFile = path.join(__dirname, '../db/database.db');

router.get('/', (req, res) => {    
    const user = validSession(req.session);
    if(req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('contact', { title: 'Contact', user, userPrivilege });
    } else {
        res.render('contact', { title: 'Contact', user });
    }
});

module.exports = router;