let shwPswdBtn = document.getElementById('showPswdBtn');
let shwVrfyPswdBtn = document.getElementById('showVrfyPswdBtn');
const password = document.querySelector('.password');
const password2 = document.querySelector('.verify');

if (shwVrfyPswdBtn == null) {
    shwPswdBtn.onclick = function() {
        this.classList.toggle('eye-hide');
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
    };
} else {
    shwPswdBtn.onclick = function() {
        this.classList.toggle('eye-hide');
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
    };
    
    shwVrfyPswdBtn.onclick = function() {
        this.classList.toggle('eye-hide');
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password2.setAttribute('type', type);  
    }
}