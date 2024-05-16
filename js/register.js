/**
 * This function is for the input to password and save the password
 */
let users = [];

function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    users.push({ name: name.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value });

    // ändern auf backen speicherung
    let allUserAsString = JSON.stringify(users);
    localStorage.setItem('users', allUserAsString);

    window.location.href = './index.html';

}