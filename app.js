const express = require('express');
const session = require('express-session');
const path = require('path');
const colors = require('colors');
const frontPage = require('./routes/');

const readRooms = require('./routes/read/rooms');
const readRoom = require('./routes/read/room');
const readMenu = require('./routes/read/menu');


const createRoom = require('./routes/create/createRoom');
// const uploadImage = require('./routes/functions/upload');
const deleteAccount = require('./routes/delete/deleteAccount');

const registerPage = require('./routes/functions/register');
const loginPage = require('./routes/functions/login');
const logout = require('./routes/functions/logout');

const accountPage = require('./routes/account');
const validSession = require('./routes/functions/userSession');

const app = express();

// session
app.use( session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routers
app.use('/', frontPage);
app.use('/login', loginPage);
app.use('/logout', logout);
app.use('/register', registerPage);
app.use('/account', accountPage);
app.use('/delete', deleteAccount);
app.use('/create', createRoom);
app.use('/rooms', readRooms);
app.use('/room', readRoom);
app.use('/menu', readMenu);

// app.use('/upload', uploadImage);
// app.use('/update', updateRoom);
// app.use('/room', readRoom);

// errors : page not found
app.use((req, res) => {
    const user = validSession(req.session);
    res.status(404);
    res.render('error', { title: 'Error', status: 404, msg: 'Page not found!', user });
});

// handling errors
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', { title: 'Error', status: res.status || 500, msg: 'An error occured!' });
});

// setting up the server
app.listen(3000, () => {
    console.log(colors.green('Server is running on port 3000.....'));
});