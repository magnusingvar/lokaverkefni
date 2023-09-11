const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const createRoom = require('../../db/create/createRoom');
const upload = require('../functions/upload');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    try {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (userPrivilege == 1) {
            res.render('roomCreatorEditor/roomCreatorEditor', { title: 'Create Room', operation: 'create', user, userPrivilege});
        } else {
            res.send('test');
        }
    } catch (e) {
        res.redirect('/');
    }
});

router.post('/', upload.single('file'), (req, res) => { 
    try {
        console.log(req.file);
        const test = req.file;
        const p = 'images/uploads/' + test.filename;
        createRoom(dbFile, req.body.for, req.body.beds, req.body.price, p);
        
        res.redirect('/');
    } catch (e) {
        res.redirect('/test');
    }
});

module.exports = router;