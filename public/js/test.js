const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

const checkinDate = checkin.value;
const checkoutDate = checkout.value;

let today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = yyyy + '-' + mm + '-' + dd;

if (checkinDate === '' && checkinDate === '') {
    checkin.classList.add('attention');
    checkout.classList.add('attention');
} else {
    if(checkinDate === '') {
        checkin.classList.add('attention');
    };

    if (checkoutDate === '') {
        checkout.classList.add('attention');
    }

    if (checkinDate < formattedToday) {
        checkin.classList.add('attention');
    }

    if (checkoutDate <= formattedToday) {
        checkout.classList.add('attention');
    }
}