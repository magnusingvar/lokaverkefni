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
    const people = parseInt(req.query.people);

    let one_day = 1000 * 60 * 60 * 24

    const ciDate = new Date(checkin)
    const coDate = new Date(checkout)

    const checkinDate = ciDate.getTime();
    const checkoutDate = coDate.getTime();

    const nights = Math.round(checkoutDate - checkinDate)/one_day

    const header = 'Rooms';
    let today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    
    const form = {
        checkin: checkin,
        checkout: checkout,
        people: people
    };

    let errorMessage = '';

    /* Switch statement that checks if:
    - Checkin date or checkout date is empty
    - Checkin date or checkout date is in the past
    - Checkin date is not more than checkout date
    - Checkin date and checkout date is the same date 
    
    and if all criteria is met then run code outside of 
    switch statement */
    if (!/\S/.test(checkin) && !/\S/.test(checkout)) {
        errorMessage = 'Both checkin and checkout date cannot be empty';
    } else {
        switch(true) {
            case !/\S/.test(checkin):
                errorMessage = 'Checkin date cannot be empty';
                break;
            case !/\S/.test(checkout):
                errorMessage = 'Checkout date cannot be empty';
                break;
            case checkin < formattedToday:
                errorMessage = 'Checkin date cannot be in the past';
                break;
            case checkout < formattedToday:
                errorMessage = 'Checkout date cannot be in the past';
                break;
            case checkin > checkout:
                errorMessage = 'Checkin date cannot be before checkout date';
                break;
            case checkout === checkin:
                errorMessage = 'Checkout date cannot be the same as the checkin date';
                break;
        }
    }

    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 5;
    let total = readRooms.totalRooms(dbFile, checkin, checkout, people);
    let totalPages = Math.ceil(total / itemsPerPage);

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
            let rooms = readRooms.readRooms(dbFile, checkin, checkout, people, orderby, page);
            return rooms;
        } else  {
            let orderby = `ORDER BY rooms.occupancy ${occupancySortBy}`;
            let rooms = readRooms.readRooms(dbFile, checkin, checkout, people, orderby, page);
            return rooms;
        }
    }

    function readRoom() {
        if (urlParams.includes('price')) {
            let rooms = orderRooms(priceSortBy);
            return rooms;
        } else if(urlParams.includes('occupancy')) {
            let rooms = orderRooms(occupancySortBy);
            return rooms;
        } else {
            let orderby = 'ORDER BY rooms.occupancy, rooms.id';
            let rooms = readRooms.readRooms(dbFile, checkin, checkout, people, orderby, page);
            return rooms;
        };
    }

    let rooms = readRoom();

    if (url === '/editRooms') {
        if (user) {
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            if (req.session.validSession && userPrivilege === 'administrator') {
                /* change room checkin, checkout and guest count to 0 
                so it will return all rooms even if they are booked */
                let rooms = readRooms.readRooms(dbFile, '0', '0', '0', '', page);
                let total = readRooms.totalRooms(dbFile, '0', '0', '0');
                let totalPages = Math.ceil(total / itemsPerPage);
                let header = 'Edit Rooms';

                if (page > totalPages) {
                    res.render('read/rooms', { title: 'Edit Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, form, operation: 'edit', page, total, totalPages });
                } else {
                    res.render('read/rooms', { title: 'Edit Rooms', user, userPrivilege, header, rooms, checkin, checkout, formattedToday, form, operation: 'edit', page, total, totalPages });
                }   
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    } else {
        if (req.session.validSession) {
            const userPrivilege = readUser(dbFile, user).userPrivilege;
            res.render('read/rooms', { title: 'Rooms', user, userPrivilege, header, rooms, checkin, checkout, people, formattedToday, form, error: errorMessage, operation: 'search', nights, price, occupancy, priceSortBy, occupancySortBy, urlParams, page, total, totalPages });
        } else {
            res.render('read/rooms', { title: 'Rooms', user, header, rooms, checkin, checkout, people, formattedToday, form, error: errorMessage, operation: 'search', nights, price, occupancy, priceSortBy, occupancySortBy, urlParams, page, total, totalPages });
        }    
        
    }
});

module.exports = router;