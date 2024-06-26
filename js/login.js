let users = [];

/**
 * Hides the element with the ID 'joinLogoAnimation' after a delay.
 *
 * This function uses `setTimeout` to add a delay of 1000 milliseconds (1 second) before adding 
 * the 'hidden' CSS class to the element with the ID 'joinLogoAnimation'.
 */
function animationWindow() {
    setTimeout(function() {
        document.getElementById('joinLogoAnimation').classList.add('hidden');
    }, 800)
}

/**
 * Checks if the entered email exists in the list of users and triggers login if found.
 *
 * This asynchronous function retrieves a list of users, checks if the provided email exists 
 * among these users, and either displays an error or proceeds to log the user in.
 */
async function existingMailLogIn() {
    users = Object.entries(await loadData('users'));
    let email = document.getElementById('email').value.toLowerCase();
    let user = users.find(u => u[1].mail == email);            
    if(user === undefined){  
        document.getElementById('loginErrorPassword').classList.remove('hidden');
    } else {    
        login();
    }
}

/**
 * Performs user login based on provided email and password.
 *
 * This asynchronous function loads user data, compares the entered email and password
 * with user data, and performs login if credentials match.
 * If credentials don't match, it displays an error message.
 */
async function login() {
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

/**
 * This function checks if the user is logged in by verifying the presence of 'userMail' in localStorage.
 * If the user is on 'privacy.html' or 'legal_notice.html' and arrived from 'login.html' or 'signup.html',or navigates between 'privacy.html' and 'legal_notice.html', they are allowed to stay.
 * @returns 
 */
function checkUser() {
    let userMail = localStorage.getItem('userMail');
    let previousPage = document.referrer;
    let currentPage = window.location.pathname;
    let dependingPages = ['/privacy.html', '/legal_notice.html', '/Join/privacy.html', '/Join/legal_notice.html'];
    if (dependingPages.includes(currentPage) && (previousPage.includes('/index.html') || previousPage.includes('/signup.html') || dependingPages.some(page => previousPage.includes(page)))) {
        return;
    }
    if (userMail === null ) {
        window.location.href = './index.html';
    } 
}

/**
 *Saves the user's email to the local storage.
 *
 * This function converts the provided email to a JSON string and saves it to the local storage
 * under the key "userMail".
 *
 * @param {string} email 
 */
function saveUser(email) {
    let userMail = JSON.stringify(email);
    localStorage.setItem("userMail", userMail);
}

/**
 * Logs the user out by removing the 'userMail' item from local storage.
 */
function logout(){
    localStorage.removeItem('userMail');
    localStorage.removeItem('logStatus');
}

/**
 * This function logs in as a guest user by removing the userMail from localStorage and redirecting to the summary page.
 */
function guestLogin() {
    saveUser('guest@mail.com');
    window.location.href = './summary.html';
}


/**
 *Changes the visibility of the password input field and toggles the password visibility icon.
 *
 * This function modifies the CSS classes of certain elements to change the appearance of the
 * password input field and toggles the visibility icon between locked and unlocked states.
 *
 */
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

/**
 * Changes the focus to the email input field and updates the styling.
 *
 * This function adds a CSS class to the email input field container to indicate focus,
 * and removes a CSS class from the password input field container.
 *
 */
function changeEmail() {
    document.getElementById('emailContainer').classList.add('password_container_border');
    document.getElementById('passwordButten').classList.remove('password_container_border');
}

/**
 * Toggles the visibility of the password input field and updates the visibility icon.
 *
 * This function toggles the visibility of the password input field between hidden and visible states.
 * It also updates the visibility icon accordingly.
 *
 */
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



