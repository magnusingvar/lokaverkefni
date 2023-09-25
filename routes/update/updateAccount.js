const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const updateAccount = require('../../db/update/updateAccount');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const userId = readUser(dbFile, user).id;
    updateAccount(dbFile, req.query.firstName, req.query.lastName, req.query.email, req.query.userId);
    res.redirect('/account');
});

module.exports = router;