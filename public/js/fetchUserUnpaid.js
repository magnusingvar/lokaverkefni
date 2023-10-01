function checkUnpaidBookings() {
    fetch('/checkUnpaidBookings')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.unpaidBookings && Array.isArray(data.unpaidBookings)) { // Check if data.data is an array
                console.log('Unpaid bookings:', data.unpaidBookings); // Log the length of the array
            }
        })
        .catch(error => {
            console.error('Error checking unpaid bookings:', error);
        });
}

// ...

checkUnpaidBookings();

setInterval(checkUnpaidBookings, 60000);