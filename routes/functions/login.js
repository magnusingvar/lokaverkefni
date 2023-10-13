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

        // Check if email is empty
        if (!email || /^\s*$/.test(email)) {
            res.render('login', { title: 'Login', user: null, header, form: form, error: 'Email cannot be empty' });
            return;
        }

        const user = loginUser(dbFile, email, password);
        const validPass = bcrypt.compareSync(password, user.password);
        let errorMessage = '';

        /* Switch statement that checks if:
        - User has verified email
        - Password field is not empty
        - Password is correct
        - User exists 
        
        and if all criteria is met then logs in user */
        switch (true) {
            case user.verifiedEmail === 0:
                errorMessage = 'Please verify your account, check your email';
                break;
            case !/\S/.test(password):
                errorMessage = 'Password cannot be empty';
                break;
            case !validPass:
                errorMessage = 'Password incorrect';
                break;
            default:
                req.session.validSession = true;
                req.session.email = req.body.email;
                res.redirect('/');
                return;
        }
        
        res.render('login', { title: 'Login', user: null, header, form: form, error: errorMessage });
    } catch (e) {
        res.render('login', { title: 'Login', user: null, header, form: form, error: 'User does not exist' });
    }
});

module.exports = router;