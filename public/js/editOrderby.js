const editBtn = document.getElementById('edit-btn');
const booking = document.getElementById('booking-editor');
const url = new URL(window.location.href);  
const urlParams = new URLSearchParams(url.search);
const select = document.getElementById("orderby");

document.addEventListener('DOMContentLoaded', function() {
    select.addEventListener('change', () => {
        const index = select.selectedIndex;    

        if (index == 0) {
            urlParams.delete('price');
            urlParams.delete('occupancy');
            window.location.search = urlParams;
        } else if (index == 1 || index == 2) {
            const value = select.value;
            urlParams.set('price', value);
            urlParams.delete('occupancy');
            window.location.search = urlParams;
        } else if (index == 3 || index == 4) {
            const value = select.value;
            urlParams.set('occupancy', value);
            urlParams.delete('price');
            window.location.search = urlParams;   
        }
    });

    editBtn.addEventListener('click', () => {
        booking.style.display = (booking.style.display === 'flex') ? 'none' : 'flex';
    });
});