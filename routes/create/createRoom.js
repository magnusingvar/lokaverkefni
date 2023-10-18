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
    if (req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (userPrivilege === 'administrator') {
            const types = readRoomTypes(dbFile);
            res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Create Room', operation: 'createRoom', user, userPrivilege, types, error: '' });
        } else {
            res.status(401).render('error', { title:'Error', status: 401, msg: 'Not authorized', user});
        }
    } else { 
        res.status(401).render('error', { title:'Error', status: 401, msg: 'Not authorized', user});
    }
});

router.post('/', (req, res) => { 
    if (req.session.validSession) {
        const user = validSession(req.session);
        let errorMessage = '';
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (userPrivilege === 'administrator') {
            if (req.body.ppn == 0 || req.body.ppn < 0) {
                errorMessage = 'Price must be a non-negative number and more than zero';
                const types = readRoomTypes(dbFile);
                res.render('roomMenuCreatorEditor/roomMenuCreatorEditor', { title: 'Create Room', operation: 'createRoom', user, userPrivilege, types, error: errorMessage });
            } else {
                createRoom(dbFile, req.body.type, req.body.occupancy, req.body.beds, req.body.bedType, req.body.ppn, req.body.description);
                res.redirect('/createRoom');
            }
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;