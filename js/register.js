/**
 * This function is for the input to password and save the password
 */

async function addUser() {
    document.getElementById('mailError').classList.add('hidden');
    document.getElementById('singupError').classList.add('hidden');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    existingPassword();
    
    await postData('users', { name: name.value, mail: email.value, password: password.value });

}

async function existingPassword() {
    users = Object.entries(await loadData('users'));
    let email = document.getElementById('email').value;
    user = users.find(u => u[1].mail == email);
    user = user[1].mail;
    // console.log(users)
    if (user != email) {
        document.getElementById('mailError').classList.remove('hidden');
        
        
    }else {
        matchPassword();
    }

}

function matchPassword() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (password != confirmPassword) {
        document.getElementById('singupError').classList.remove('hidden');
        
        document.getElementById('confirmPassword').classList.add('input-border');
    } else {
        successful()
    }
}

function successful() {
    let signupButton = document.getElementById('signupButton');
    let successMessage = document.getElementById('successMessage');


    signupButton.classList.add('cover-button');
    successMessage.classList.remove('hidden');
    successMessage.classList.add('show');


    setTimeout(() => {
        window.location.href = './index.html';
    }, 1500);
}