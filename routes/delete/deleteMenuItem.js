const express = require('express');
const router = express.Router();
const path = require('path');
const deleteMenuItem = require('../../db/delete/deleteMenuItem');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.post('/', (req, res) => {
    const user = validSession(req.session);
    if (user) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (req.session.validSession && userPrivilege === 'administrator') {
            deleteMenuItem(dbFile, req.body.id);
            res.redirect('/editMenu');
        } else {
            res.redirect('/');
            // res.render('error', { title: 'Error', status: 403, msg: `Access denied.`, user });
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;