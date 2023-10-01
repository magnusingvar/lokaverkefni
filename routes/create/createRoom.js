const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const readRoomTypes = require('../../db/read/readRoomTypes');
const createRoom = require('../../db/create/createRoom');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const error = req.query.error;

    try {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        if (userPrivilege == "administrator") {
            const types = readRoomTypes(dbFile);
            if (error != 1) {
                res.render('roomCreatorEditor/roomCreatorEditor', { title: 'Create Room', operation: 'create', user, userPrivilege, types, msg: ''});
            } else {
                res.render('roomCreatorEditor/roomCreatorEditor', { title: 'Create Room', operation: 'create', user, userPrivilege, types, msg: 'Room creation failed'});
            }
        } else {
            res.redirect('/');
        }
    } catch (e) {
        res.redirect('/');
    }
});

// router.post('/', upload.single('file'), (req, res, next) => {
//     try {
//         res.end("File is uploaded successfully!");  
//     } catch (e) {
//         return res.end("Error uploading file.");  
//     } 
// });

router.post('/', (req, res) => { 
    try {
        if (userPrivilege = "administrator") {
            if (req.body.ppn != 0) {
                createRoom(dbFile, req.body.type, req.body.occupancy, req.body.beds, req.body.bedType, req.body.ppn, req.body.description);
                res.redirect('/create');
            } else {
                res.redirect('/create?error=1');
            }
        } else {
            res.redirect('/');
        }
    } catch (e) {
        res.redirect('/create?error=1');
    }
});

module.exports = router;