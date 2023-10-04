const express = require('express');
const router = express.Router();
const path = require('path');
const readRooms = require('../../db/read/readRooms');
const readUser = require('../../db/read/readUser');
const validSession = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    const user = validSession(req.session);
    const checkin = req.query.checkin;
    const checkout = req.query.checkout;
    const people = req.query.people;

    let one_day = 1000 * 60 * 60 * 24

    const ciDate = new Date(checkin)
    const coDate = new Date(checkout)

    const checkinDate = ciDate.getTime();
    const checkoutDate = coDate.getTime();

    const nights = Math.round(checkoutDate - checkinDate)/one_day

    const header = 'Rooms';
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy + '-' + mm + '-' + dd;

    const form = {
        checkin: req.query.checkin,
        checkout: req.query.checkout
    };

    // Message for when room search query is invalid
    const msg = `Please try again,
    make sure the checkin date is not in the past and 
    that both the checkin and checkout field are filled 
    out correctly. Also make sure that the checkout
    date is not the same as the checkin date.`

    const url = req.baseUrl;
    const urlParamsFull = req.url;
    const urlParams = urlParamsFull.slice(1);
    const price = req.query.price;
    const occupancy = req.query.occupancy;
    let priceSortBy = req.query.price;
    let occupancySortBy = req.query.occupancy;

    function orderRooms() {
        if (priceSortBy === 'asc' || priceSortBy === 'desc') {
            let orderby = `ORDER BY rooms.ppn ${priceSortBy}`;
            let rooms = readRooms.readRooms(dbFile, checkin, checkout, people, orderby, '1');
            return rooms;
        } else  {
            let orderby = `ORDER BY rooms.occupancy ${occupancySortBy}`;
            let rooms = readRooms.readRooms(dbFile, checkin, checkout, people, orderby, '1');
            return rooms;
        }
    }

    const page = parseInt(req.query.page) || 1;
    const total = readRooms.totalRooms(dbFile);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(total / itemsPerPage);
    
    function readRoom() {
        if (urlParams.includes('price')) {
            let rooms = orderRooms(priceSortBy);
            return rooms;
        } else if(urlParams.includes('occupancy')) {
            let rooms = orderRooms(occupancySortBy);
            return rooms;
        } else {
            let orderby = 'ORDER BY rooms.id ASC';
            let rooms = readRooms.readRooms(dbFile, checkin, checkout, people, orderby, page);
            return rooms;
        };
    }

    let rooms = readRoom();

    if (url === '/editRooms') {
        if (req.session.validSession) {
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            if (page > totalPages) {
                res.render('read/rooms', { title: 'Edit Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, msg: 'test', form, operation: 'edit', page, totalPages });
            } else {
                const rooms = readRooms.readRooms(dbFile, '', '', '', '', page);
                res.render('read/rooms', { title: 'Edit Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, msg, form, operation: 'edit', page, totalPages });
            }   
        } else {
            res.redirect('/');
        }
    } else {
        if (page > totalPages && rooms.length > 0) {
            res.status(404).render('error', { title:'Error', status: 404, msg: 'Page not found!', user});
        } else {
            if (req.session.validSession) {
                const userPrivilege = readUser(dbFile, user).userPrivilege;
                res.render('read/rooms', { title: 'Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, msg, form, operation: 'search', nights, price, occupancy, priceSortBy, occupancySortBy, urlParams, page, totalPages });
            } else {
                res.render('read/rooms', { title: 'Rooms', user, header, rooms, checkin, checkout, formattedToday, error: 'Please try again', msg, form, operation: 'search', nights, price, occupancy, priceSortBy, occupancySortBy, urlParams, page, totalPages });
            }    
        }
    }
});

module.exports = router;