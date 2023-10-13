const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../db/read/readUser');
const validSession = require('./functions/userSession');
const dbFile = path.join(__dirname, '../db/database.db');

router.get('/', (req, res) => {    
    const user = validSession(req.session);
    const form = {
        checkin: '',
        checkout: '',
        people: ''
    }

    if(req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('index', { title: 'Homepage', user, userPrivilege, form });
    } else {
        res.render('index', { title: 'Homepage', user, form });
    }
});

module.exports = router;