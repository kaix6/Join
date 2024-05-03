function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    users.push({ email: email.value, password: password.value, name: name.value });

    // ändern auf backen speicherung
    let allUserAsString = JSON.stringify(users);
    localStorage.setItem('users', allUserAsString);

    window.location.href = '/index.html';

}