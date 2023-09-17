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
        res.render('index', { title: 'Homepage', user, userPrivilege});
    } else {
        res.render('index', { title: 'Homepage', user});
    }
});

module.exports = router;