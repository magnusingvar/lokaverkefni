document.addEventListener('DOMContentLoaded', function() {
    const deleteBtn = document.getElementById('deleteBtn');
    const confirmDiv = document.getElementById('confirm');

    deleteBtn.addEventListener('click', () => {
        confirmDiv.style.display = 'flex';
    });

    confirmDiv.addEventListener('click', (event) => {
        if (event.target.id === 'no') {
            confirmDiv.style.display = 'none';
            const url = window.location.toString();
            if (url.includes('#')) {
                const cleanUrl = url.split('#')[0];
                window.history.replaceState({}, document.title, cleanUrl);
            }
        }
    });
});