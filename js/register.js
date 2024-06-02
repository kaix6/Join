/**
 * This function is for the input to password and save the password
 */

async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let colorAllocation = getRandomItem(colors);
    let firstLetters = getContactsInitials(name.value);
    matchPassword();
    await postData('users', { name: name.value, mail: email.value, password: password.value });
    await postData(`contacts`, { name: capitalizeFirstLetters(name.value), mail: email.value, phone: '', color: colorAllocation, letters: firstLetters });
}

function matchPassword() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (password != confirmPassword) {
        singupError.classList.remove('hidden');
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