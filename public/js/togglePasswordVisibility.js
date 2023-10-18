document.addEventListener('DOMContentLoaded', function() {
    const shwPswdBtn = document.getElementById('showPswdBtn');
    const shwVrfyPswdBtn = document.getElementById('showVrfyPswdBtn');
    const password = document.getElementById('password');
    const password2 = document.getElementById('verifyPassword');
    
    shwPswdBtn.addEventListener('click', function() {
        this.classList.toggle('eye-show');
        this.classList.toggle('eye-hide');
        password.type = password.type === 'password' ? 'text' : 'password';
    });
    
    if (shwVrfyPswdBtn !== null) {
        shwVrfyPswdBtn.addEventListener('click', function() {
            this.classList.toggle('eye-show');
            this.classList.toggle('eye-hide');
            password2.type = password2.type === 'password' ? 'text' : 'password';
        });
    }
});