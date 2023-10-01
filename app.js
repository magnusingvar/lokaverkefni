const express = require('express');
const session = require('express-session');
const path = require('path');
const colors = require('colors');

const frontPage = require('./routes/');

const readRooms = require('./routes/read/readRooms');
const readRoom = require('./routes/read/readRoom');
const readRestaurant = require('./routes/read/readMenu');

const booking = require('./routes/create/createBooking');
const userBooking = require('./routes/read/userBooking');
const cancelBooking = require('./routes/functions/cancelBooking');

const createRoom = require('./routes/create/createRoom');
const updateRoom = require('./routes/update/updateRoom');
const deleteRoom = require('./routes/delete/deleteRoom');

const registerPage = require('./routes/functions/register');
const loginPage = require('./routes/functions/login');
const logout = require('./routes/functions/logout');

const accountPage = require('./routes/read/account');
const validSession = require('./routes/functions/userSession');

const checkout = require('./routes/functions/checkout');
const checkUnpaid = require('./routes/functions/checkUnpaidBookings');

const contactPage = require('./routes/contact');

const autoRemoveBookings = require('./routes/functions/autoRemoveBookings');

const cron = require('node-cron');

const cookieParser = require('cookie-parser');
const dbFile = path.join(__dirname, './db/database.db');
const app = express();

/* run cron schedule every minute that 
auto remove bookings that have exceed 
the 10 minute limit */
cron.schedule('* * * * *', () => {
    autoRemoveBookings(dbFile);
});

// cookie parser
app.use(cookieParser());

// session
app.use(session({    
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: ((60000 * 60) * 24) * 30
    }
}));  

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
app.use('/create', createRoom);
app.use('/rooms', readRooms);
app.use('/room', readRoom);
app.use('/restaurant', readRestaurant);
// app.use('/edit-menu', edit);
app.use('/book', booking);
app.use('/bookings', userBooking);
app.use('/edit', readRooms);
app.use('/update', updateRoom);
app.use('/delete', deleteRoom);
app.use('/cancel', cancelBooking);
app.use('/checkout', checkout);
app.use('/checkUnpaidBookings', checkUnpaid);
app.use('/contact', contactPage);
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

