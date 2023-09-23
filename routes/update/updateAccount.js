const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const updateAccount = require('../../db/update/updateAccount');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => { 
    updateAccount(dbFile, req.body.firstName, req.body.lastName, req.body.email, 1);
    res.redirect('/')
});

module.exports = router;