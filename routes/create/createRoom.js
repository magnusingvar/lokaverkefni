const express = require('express');
const router = express.Router();
const path = require('path');
const createRoom = require('../../db/create/createRoom');
const readRoomTypes = require('../../db/read/readRoomTypes');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const error = req.query.error;

    try {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (userPrivilege == 'administrator') {
            const types = readRoomTypes(dbFile);
            if (error != 1) {
                res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Create Room', operation: 'createRoom', user, userPrivilege, types, msg: '' });
            } else {
                res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Create Room', operation: 'createRoom', user, userPrivilege, types, msg: 'Room creation failed' });
            }
        } else {
            res.redirect('/');
        }
    } catch (e) {
        res.redirect('/');
    }
});

router.post('/', (req, res) => { 
    try {
        if (userPrivilege = 'administrator') {
            if (req.body.ppn != 0) {
                createRoom(dbFile, req.body.type, req.body.occupancy, req.body.beds, req.body.bedType, req.body.ppn, req.body.description);
                res.redirect('/createRoom');
            } else {
                res.redirect('/createRoom?error=1');
            }
        } else {
            res.send('not authorized');
        }
    } catch (e) {
        res.redirect('/createMenuItem?error=1');
    }
});

module.exports = router;