let shwPswdBtn = document.getElementById('showPswdBtn');
const password = document.querySelector('.password');
const password2 = document.querySelector('.verify');

shwPswdBtn.onclick = function() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    password2.setAttribute('type', type);
};