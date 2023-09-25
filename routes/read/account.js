const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const updateAccount = require('../../db/update/updateAccount');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const header = 'My account';
    const user = validSession(req.session);
    if (req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        const account = readUser(dbFile, user);
        res.render('read/account', { title: 'My account', account, user, userPrivilege, header });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;