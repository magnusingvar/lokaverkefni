const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const registerUser = require('../../db/functions/registerFunction');
const dbFile = path.join(__dirname, '../../db/database.db');
require('dotenv').config();

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
        res.render('register', { title: 'Register', user, userPrivilege, header, form: form, error: '' });
    } else {
        res.render('register', { title: 'Register', user, header, form: form, error: '' });
    }
});

// post register page
router.post('/', (req, res) => {
    const user = validSession(req.session);
    const header = 'Register';

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
    
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.verifyPassword; 

        // Check if email is empty
        if (!email || /^\s*$/.test(email)) {
            if(req.session.validSession) {
                const userPrivilege = readUser(dbFile, user).userPrivilege;
                res.render('register', { title: 'Register', user, userPrivilege, header, form: form, error: 'Email cannot be empty' });
            } else {
                res.render('register', { title: 'Register', user, header, form: form, error: 'Email cannot be empty' });
            }
            return;
        }

        let errorMessage = '';

        /* Switch statement that checks if:
        - Password is not empty
        - Passwords match
        - First Name and Last Name field are not empty
        - If user exists 
        
        and if all criteria is met then register user
        and send confirmation email */
        switch(true) {
            case !/\S/.test(password):
                errorMessage = 'Password cannot be empty';
                break;
            case password !== password2:
                errorMessage = 'Passwords do not match';
                break;
            case !/\S/.test(firstName):
                errorMessage = 'First name cannot be empty';
                break;
            case !/\S/.test(lastName):
                errorMessage = 'Last name cannot be empty';
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
            
                let transport = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASSWORD
                    }
                });   
            
                const mailOptions = {
                    from: '"Lokaverkefni" <magnuslokaverkefni@gmail.com>',
                    to: email,
                    subject: 'Confirm your account',
                    html: `Use the following link to confirm your account: <a href="${url}">Confirm</a>`
                };

                transport.sendMail(mailOptions);
                res.redirect('/login');
                return;
        }

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