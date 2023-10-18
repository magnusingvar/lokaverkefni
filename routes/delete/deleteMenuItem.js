const express = require('express');
const router = express.Router();
const path = require('path');
const deleteMenuItem = require('../../db/delete/deleteMenuItem');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.post('/', (req, res) => {
    if (req.session.validSession) {
        const user = validSession(req.session);
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (userPrivilege === 'administrator') {
            deleteMenuItem(dbFile, req.body.id);
            res.redirect('/editMenu');
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;