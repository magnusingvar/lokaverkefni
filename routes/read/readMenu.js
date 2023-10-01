const express = require('express');
const router = express.Router();
const path = require('path');
const readMenu = require('../../db/read/readMenus');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const menu = 'none';
    if (req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('read/menu', { title: 'Restaurant', user, userPrivilege, menu } );
    } else {
        const userPrivilege = readUser(dbFile, user);
        res.render('read/menu', { title: 'Restaurant', user, userPrivilege, menu });
    }
});

router.get('/:menu', (req, res) => {
    const menuParam = req.params.menu;
    const menuName = menuParam.charAt(0).toUpperCase() + menuParam.slice(1);
    const user = validSession(req.session);
    const menu = readMenu(dbFile, menuName);
    
    console.log(menu)
    try {
        if (menu != undefined) {
            if (req.session.validSession) {
                const userPrivilege = readUser(dbFile, user).userPrivilege;
                res.render('read/menu', { title: `${menu[0].type}`, user, userPrivilege, menu} );
            } else {
                const userPrivilege = readUser(dbFile, user);
                res.render('read/menu', { title: `${menu[0].type}`, user, userPrivilege, menu});
            }
        }
    } catch (e) {
        res.status(404);
        res.redirect('/error');
    }
})


module.exports = router;