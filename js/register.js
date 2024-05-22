/**
 * This function is for the input to password and save the password
 */
let users = [];

async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    matchPassword();
    newUsers.push({ email: email.value, password: password.value, name: name.value });

    await initialLoadUsersFirebase();
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

async function initialLoadUsersFirebase() {
    let response = await fetch('#newUsers');
    users = await response.json();

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        await postData('users', { name: user.name, mail: user.mail, password: user.password })


    }
    await loadData('users');


    // await editData(`user/${ name: user.name, mail: user.mail, password: user.password });
}