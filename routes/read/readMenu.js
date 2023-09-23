const express = require('express');
const router = express.Router();
const path = require('path');
// const readRoom = require('../../db/read/readRoom');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    if (req.session.loggedIn) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('read/menu', { title: 'Menu', user, userPrivilege } );
    } else {
        const userPrivilege = readUser(dbFile, user);
        res.render('read/menu', { title: 'Menu', user, userPrivilege });
    }
});

module.exports = router;