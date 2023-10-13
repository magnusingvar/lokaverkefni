const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

const checkinDate = checkin.value;
const checkoutDate = checkout.value;

let today = new Date();
const formattedToday = today.toISOString().split('T')[0];

switch (true) {
    case checkinDate === '' && checkoutDate === '':
        checkin.classList.add('attention');
        checkout.classList.add('attention');
        break;
    case checkinDate === '':
        checkin.classList.add('attention');
        break;
    case checkoutDate === '':
        checkout.classList.add('attention');
        break;
    case checkoutDate < formattedToday:
        checkout.classList.add('attention');
        break;
    case checkinDate > checkoutDate:
        checkin.classList.add('attention');
        break;
    case checkinDate < formattedToday:
        checkin.classList.add('attention');
        break;
    case checkoutDate === checkoutDate:
        checkout.classList.add('attention');
        break;
}