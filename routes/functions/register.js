const express = require('express');
const router = express.Router();
const path = require('path');
const sendMail = require('../functions/mail');
const jwt = require('jsonwebtoken');
const registerUser = require('../../db/functions/registerFunction');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

// get register page
router.get('/', (req, res) => {
    const user = validSession(req.session);
    const header = 'Register';

    /* Keep the form data to use when
	an error is thrown so the user
	does not have to retype it */
    let form = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        verifyPassword: ''
    };

    if(req.session.validSession) {
        const userPrivilege = readUser(dbFile, user).userPrivilege;
        res.render('register', { title: 'Register', user, userPrivilege, header, form: form, error: '' });
    } else {
        res.render('register', { title: 'Register', user, header, form: form, error: '' });
    }
});

// // post register page
router.post('/', (req, res) => {
    const user = validSession(req.session);
    const header = 'Register';
    
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        verifyPassword: req.body.verifyPassword
    };

    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.verifyPassword; 

        let errorMessage = '';
        
        // check if email is valid
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const validEmail = emailRegexp.test(email);
        
        /* Switch statement that checks if:
        - Required fields are filled out
        - Email is valid
        - Passwords match
        - If user exists (server side only)
        
        after checks have been done client side that prevent
        form submit until met and if all criteria is met
        then register user and send confirmation email 
        
        server sends error message as fallback if client side
        javascript fails */
        switch(true) {
            case (!/\S/.test(firstName) || !/\S/.test(email) || !/\S/.test(password)):
                errorMessage = 'Please fill out all required fields marked with *';
                break;
            case !validEmail:
                errorMessage = 'Email is not valid';
                break;
            case password !== password2:
                errorMessage = 'Passwords do not match';
                break;
            default:
                registerUser(dbFile, firstName, lastName, email, password);
                const EMAIL_SECRET = 'supersecrettoken'
                let emailToken = jwt.sign(
                    { user: readUser(dbFile, email).id, },
                    EMAIL_SECRET,
                    { expiresIn: '1d', },
                );
            
                const hostname = req.hostname;
                const url = `http://${hostname}:3000/account/confirmation/${emailToken}`
                const recipient = email;
                const sender = 'magnuslokaverkefni@gmail.com';
                const subject = 'Confirm your account';
                const text = '';
                const html = `Use the following link to confirm your account: <a href="${url}">Confirm</a>`;
                sendMail(recipient, sender, subject, text, html);
                res.redirect('/login');
                return;
        }

        // rerender page if server side checks do not pass with an error message
        if (req.session.validSession) {
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            res.render('register', { title: 'Register', user, userPrivilege, header, form: form, error: errorMessage });
        } else {
            res.render('register', { title: 'Register', user: null, header, form: form, error: errorMessage });
        }
    } catch (e) {
        res.render('register', { title: 'Register', user: null, header, form: form, error: 'Email is already associated with an account' });
    }
});

module.exports = router;