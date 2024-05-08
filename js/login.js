let users = [];

async function addUsersJason() {
    let response = await fetch('./js/users.json');
    users = await response.json();
}

/**
 * This function is to animat the start page
 */

function animationWindow() {
    setTimeout(function() {
        document.getElementById('joinLogoAnimation').classList.add('hidden');
    }, 1500)
}

/**
 * This function is to checkt for the rigth password 
 */

async function login() {
    await addUsersJason();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.mail == email.value && u.password == password.value);
    console.log(user);
    if (user) {
        console.log('user gefunden')
    }
    window.location.href = './summary.html';
}