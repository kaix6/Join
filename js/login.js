let users = [];


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
    users = Object.entries(await loadData('users'));
    let email = document.getElementById('email').value.toLowerCase();
    let password = document.getElementById('password').value;
    let user = users.find(u => u[1].mail == email && u[1].password == password);
    if (user) {
        saveUser(email);
        window.location.href = './summary.html';

    } else {
        document.getElementById('loginError').classList.remove('hidden');
        document.getElementById('passwordButten').classList.add('input-border');
    }
}

function saveUser(email) {
    let  userMail = JSON.stringify(email);
    localStorage.setItem("userMail", userMail);

}


