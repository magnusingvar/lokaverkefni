const express = require('express');
const path = require('path');
const readUser = require('../../db/read/readUser');
const deleteUser = require('../../db/delete/deleteUser');
const router = express.Router();
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const email = validSession(req.session);
    const user = readUser(dbFile, email);

    deleteUser(dbFile, user.email);
    console.log('user deleted');
    req.session.validSession = false;
    res.redirect('/');
});

module.exports = router;