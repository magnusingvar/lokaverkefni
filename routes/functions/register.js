const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const registerUser = require('../../db/functions/registerFunction');
const dbFile = path.join(__dirname, '../../db/database.db');

// get register page
router.get('/', (req, res) => {
    const user = validSession(req.session);
    const header = 'Register';

    // form data
    const form = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    };

    if(req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('register', { title: 'Register', user, header, userPrivilege, form: form, error: '' });
    } else {
        res.render('register', { title: 'Register', user, header, form: form, error: '' });
    }
});

// post register page
router.post('/', (req, res) => {
    try {
        const user = validSession(req.session);
        const header = 'Register';

        // request register inputs
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.verifyPassword;

        /* Keep the form data to use when
		an error is thrown so the user
		does not have to retype it */
        const form = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.verifyPassword
        };

        /* if the verify password field matches
		the password field run the registerUser function
		else throw an error message with the message :
		'Passwords do not match' */
        if (password !== password2) {	
            res.render('register', { title: 'Register', user, header, form: form, error: 'Passwords do not match' });
        } else {
            registerUser(dbFile, firstName, lastName, email, password);
            res.redirect('/');
        }
    } catch (e) {
        res.render('error', { title: 'Error', status: '403', msg: 'User already exists!'});
    }
});

module.exports = router;