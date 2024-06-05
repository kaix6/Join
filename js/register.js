/**
 * This function is for the input to password and save the password
 */

async function addUser() {
    document.getElementById('mailError').classList.add('hidden');
    document.getElementById('singupError').classList.add('hidden');
    existingMail();
}


async function existingMail() {
        users = Object.entries(await loadData('users'));
        let email = document.getElementById('email').value.toLowerCase();
        user = users.find(u => u[1].mail == email);            
        if(user === undefined){  
        matchPassword();
        }else {
            document.getElementById('mailError').classList.remove('hidden');  
        }
}

async function matchPassword() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (password != confirmPassword) {
        document.getElementById('singupError').classList.remove('hidden');        
        document.getElementById('confirmPassword').classList.add('input-border');
    } else {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let colorAllocation = getRandomItem(colors);
    let firstLetters = getContactsInitials(name.value);
    await postData('users', { name: name.value, mail: email.value, password: password.value });
    await postData(`contacts`, { name: capitalizeFirstLetters(name.value), mail: email.value, phone: '', color: colorAllocation, letters: firstLetters });
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


function changeName() {
    document.getElementById('nameContainer').classList.add('password_container_border');
    document.getElementById('emailContainer').classList.remove('password_container_border');
    document.getElementById('passwordButten').classList.remove('password_container_border');
    document.getElementById('confirmPasswordButten').classList.remove('password_container_border');
}


function changeEmail() {
    document.getElementById('nameContainer').classList.remove('password_container_border');
    document.getElementById('emailContainer').classList.add('password_container_border');
    document.getElementById('passwordButten').classList.remove('password_container_border');
    document.getElementById('confirmPasswordButten').classList.remove('password_container_border');
}

function changePassword() {
    document.getElementById('nameContainer').classList.remove('password_container_border');
    document.getElementById('emailContainer').classList.remove('password_container_border');
    document.getElementById('passwordButten').classList.add('password_container_border');
    document.getElementById('confirmPasswordButten').classList.remove('password_container_border');
    var x = document.getElementById("password");
    if (x.type === "password") {
        document.getElementById('passwordLock').classList.add('hidden');
        document.getElementById('notSee').classList.remove('hidden');
    } else {
        document.getElementById('passwordLock').classList.add('hidden');
        document.getElementById('notSee').classList.add('hidden');
    }
}


function changeConfirmPassword() {
    document.getElementById('nameContainer').classList.remove('password_container_border');
    document.getElementById('emailContainer').classList.remove('password_container_border');
    document.getElementById('passwordButten').classList.remove('password_container_border');
    document.getElementById('confirmPasswordButten').classList.add('password_container_border');
    var x = document.getElementById("confirmPassword");
    if (x.type === "password") {
        document.getElementById('confirmpPasswordLock').classList.add('hidden');
        document.getElementById('notSeeConfirm').classList.remove('hidden');
    } else {
        document.getElementById('passwordLock').classList.add('hidden');
        document.getElementById('notSeeConfirm').classList.add('hidden');
    }
}



function togglePasswordVisibility() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById('lock').classList.remove('hidden');
      document.getElementById('notSee').classList.add('hidden');
      
    } else {
      x.type = "password";
      document.getElementById('lock').classList.add('hidden');
      document.getElementById('notSee').classList.remove('hidden');
    }
  }

  function toggleConfirmPasswordVisibility() {
    var x = document.getElementById("confirmPassword");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById('seeConfirm').classList.remove('hidden');
      document.getElementById('notSeeConfirm').classList.add('hidden');
      
    } else {
      x.type = "password";
      document.getElementById('seeConfirm').classList.add('hidden');
      document.getElementById('notSeeConfirm').classList.remove('hidden');
    }
  }

  function showMessage() {
    const message = document.getElementById('successMessage');
    message.classList.remove('hidden');
    message.classList.add('animate');
  }