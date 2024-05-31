let users = [];

// async function addUsersJason() {
//     let response = await fetch('./js/users.json');
//     users = await response.json();
// }

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
    // await addUsersJason();
    users = Object.entries(await loadData('users'));

    console.log(users);
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.find(u => u[1].mail == email && u[1].password == password);
    console.log(user);
    if (user) {
        console.log('user gefunden');
        window.location.href = './summary.html';
    } else {
        loginError.classList.remove('hidden');
        document.getElementById('password').classList.add('input-border');
    }
}


function setLastVisitedPage(Id) {
    localStorage.setItem('lastVisitedPage', window.location.href);
}

function goBack() {
    let lastVisitedPage = localStorage.getItem('lastVisitedPage');
    if (lastVisitedPage) {
        window.location.href = lastVisitedPage;
    } else {
        alert('Es wurde keine vorherige Seite gefunden.');
    }
}