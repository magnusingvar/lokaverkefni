// Get references to the dropdown toggle and dropdown menu
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

// Add an event listener to the dropdown toggle
dropdownToggle.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior

    // Toggle the visibility of the dropdown menu
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

// Close the dropdown menu when clicking outside of it
document.addEventListener('click', function (e) {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.style.display = 'none';
    }
});
