const express = require('express');
const router = express.Router();
const path = require('path');
const readMenu = require('../../db/read/readMenu');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const menu = readMenu(dbFile, 'none');
    const url = req.baseUrl;

    if (url === '/editMenu') {
        if (req.session.validSession) {
            const menu = readMenu(dbFile, 'Breakfast', 'Dinner');
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            if (userPrivilege === 'administrator') {
                const userPrivilege = readUser(dbFile, user).userPrivilege;
                let header = 'Edit Menu';
                res.render('read/menu', { title: 'Edit Menu', user, userPrivilege, header, menu, operation: 'edit' });
            } else {
                res.status(401).render('error', { title:'Error', status: 401, msg: 'Not authorized', user});
            }
        } else {
            res.status(401).render('error', { title:'Error', status: 401, msg: 'Not authorized', user});
        }
    } else {
        if (req.session.validSession) {
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            res.render('read/menu', { title: 'Restaurant', user, userPrivilege, menu, operation: 'view' });
        } else {
            res.render('read/menu', { title: 'Restaurant', user, menu, operation: 'view' });
        }
    }
});

router.get('/:menu', (req, res) => {
    const menuParam = req.params.menu;
    const menuName = menuParam.charAt(0).toUpperCase() + menuParam.slice(1);
    const user = validSession(req.session);
    const menu = readMenu(dbFile, menuName);
    try {
        if (menu != undefined || menu != '') {
            if (req.session.validSession) {
                const userPrivilege = readUser(dbFile, user).userPrivilege;
                res.render('read/menu', { title: `${menu[0].menuType} Menu`, user, userPrivilege, menu, operation: 'view' });
            } else {
                res.render('read/menu', { title: `${menu[0].menuType} Menu`, user, menu, operation: 'view' });
            }
        }
    } catch (e) {
        res.status(404).render('error', { title:'Error', status: 404, msg: 'Page not found!', user });
    }
});

module.exports = router;