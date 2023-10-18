const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateRegister() {
    const firstNameInput = document.querySelector('.firstName');
    const emailInput = document.querySelector('.email');
    const passwordInput = document.querySelector('.password');
    const verifyPasswordInput = document.querySelector('.verify');
    const msg = document.querySelector('.msg');

    msg.textContent = '';

    switch (true) {
        case (!/\S/.test(firstNameInput.value) || !/\S/.test(emailInput.value) || !/\S/.test(passwordInput.value)):
            msg.textContent = 'Please fill out all required fields marked with *';
            return false;
        case !emailRegexp.test(emailInput.value):
            msg.textContent = 'Email is not valid';
            return false;
        case passwordInput.value !== verifyPasswordInput.value:
            msg.textContent = 'Passwords do not match';
            return false;
        default:
            return true;
    }
}

function validateLogin() {
    const emailInput = document.querySelector('.email');
    const passwordInput = document.querySelector('.password');
    const msg = document.querySelector('.msg');

    msg.textContent = '';

    switch (true) {
        case !emailInput.value || /^\s*$/.test(emailInput.value):
            msg.textContent = 'Email cannot be empty';
            return false;
        case !emailRegexp.test(emailInput.value):
            msg.textContent = 'Email is not valid';
            return false;
        case !/\S/.test(passwordInput.value):
            msg.textContent = 'Password cannot be empty';
            return false;
        default:
            return true;
    }
}