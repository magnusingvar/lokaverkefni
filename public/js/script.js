document.addEventListener('DOMContentLoaded', function() {
    const shwPswdBtn = document.getElementById('showPswdBtn');
    const shwVrfyPswdBtn = document.getElementById('showVrfyPswdBtn');
    const password = document.querySelector('.password');
    const password2 = document.querySelector('.verify');

    shwPswdBtn.onclick = function() {
        this.classList.toggle('eye-hide');
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
    };

    if (shwVrfyPswdBtn !== null) {
        shwVrfyPswdBtn.onclick = function() {
            this.classList.toggle('eye-hide');
            const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
            password2.setAttribute('type', type);
        };
    }
});