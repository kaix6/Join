/**
 * This function is for the input to password and save the password
 */

async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    matchPassword();
    await postData('users', { name: name.value, mail: email.value, password: password.value });


    window.location.href = './index.html';

}

function matchPassword() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (password != confirmPassword) {
        alert("Passwords did not match");
    } else {
        alert("Password created successfully");
    }
}