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


function logout() {
    localStorage.removeItem('userMail');
}


/**
 * This function checks if the user is logged in by verifying the presence of 'userMail' in localStorage.
 * If the user is on 'privacy.html' or 'legal_notice.html' and arrived from 'login.html' or 'signup.html',or navigates between 'privacy.html' and 'legal_notice.html', they are allowed to stay.
 * @returns 
 */
function checkUser() {
    let userMail = localStorage.getItem('userMail');
    let previousPage = document.referrer;
    let currentPage = window.location.pathname;
    let dependingPages = ['/privacy.html', '/legal_notice.html'];

    // Check if the user is on privacy.html or legal_notice.html and came from login.html or signup.html
    if (dependingPages.includes(currentPage) && (previousPage.includes('/index.html') || previousPage.includes('/signup.html') || dependingPages.some(page => previousPage.includes(page)))) {
        return;
    }
    if (userMail === null) {
        window.location.href = './index.html';
    }
}


/**
 * This function logs in as a guest user by removing the userMail from localStorage and redirecting to the summary page.
 */
function guestLogin() {
    saveUser('guest@mail.com');
    window.location.href = './summary.html';
}


function saveUser(email) {
    userMail = JSON.stringify(email);
    localStorage.setItem("userMail", userMail);
}


function changePassword() {
    document.getElementById('passwordButten').classList.add('password_container_border');
    document.getElementById('emailContainer').classList.remove('password_container_border');
    var x = document.getElementById("password");
    if (x.type === "password") {
        document.getElementById('passwordLock').classList.add('hidden');
        document.getElementById('unlock').classList.remove('hidden');
    } else {
        document.getElementById('passwordLock').classList.add('hidden');
        document.getElementById('unlock').classList.add('hidden');
    }
}

function changeEmail() {
    document.getElementById('emailContainer').classList.add('password_container_border');
    document.getElementById('passwordButten').classList.remove('password_container_border');
}


function togglePasswordVisibility() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById('lock').classList.remove('hidden');
      document.getElementById('unlock').classList.add('hidden');
      
    } else {
      x.type = "password";
      document.getElementById('lock').classList.add('hidden');
      document.getElementById('unlock').classList.remove('hidden');
    }
  }



