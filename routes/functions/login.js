const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('./userSession');
const loginUser = require('../../db/functions/loginFunction');
const bcrypt = require('bcrypt');
const dbFile = path.join(__dirname, '../../db/database.db');

// Get login page
router.get('/', (req, res) => {
    const user = validSession(req.session);
    const header = 'Login';

    // form data
    const form = {
        email: '',
        password: ''
    };

    if (req.session.validSession) {
        res.redirect('/');
    } else {
        const userPrivilege = readUser(dbFile, user);
        res.render('login', { title: 'Login', user, userPrivilege, header, form: form, error: '' });
    }
});

// post login page
router.post('/', (req, res) => {
    const header = 'Login';
    
    /* Keep the form data to use when
	an error is thrown so the user
	does not have to retype it */
    const form = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = loginUser(dbFile, email, password);
        const validPass = bcrypt.compareSync(password, user.password);

        /* If password matches a user then 
		set valid session and redirect the
		user to the homepage else render login
		form with the error message : 
		'Password incorrect'  */
        if (user.verifiedEmail != 0) {
            if (validPass) {
                req.session.validSession = true;
                req.session.email = req.body.email;

                res.redirect('/')
            } else {
                res.render('login', { title: 'Login', user, header, form: form, error: 'Password incorrect' });
            }
        } else {
            res.render('login', { title: 'Login', user, header, form: form, error: 'Please verify your account, check your email' });
        }
    } catch (e) {
        res.render('login', { title: 'Login', user: 'none', header, form: form, error: 'User does not exist' });
    }
});

module.exports = router;