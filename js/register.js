/**
 *  Adds a new user by checking existing email and displaying potential errors.
 *
 * This asynchronous function starts by hiding any existing error messages related to email and signup.
 * Then, it calls the existingMail function to check if the provided email already exists.
 *
 */

async function addUser() {
    document.getElementById('mailError').classList.add('hidden');
    document.getElementById('singupError').classList.add('hidden');
    existingMailSignUp();
}


/**
 * Checks if the provided email already exists in the user database.
 *
 * This asynchronous function loads user data, retrieves the entered email,
 * and checks if it matches any existing email in the user database.
 * If the email does not exist, it proceeds to check the password.
 * If the email exists, it displays an error message.
 */

async function existingMailSignUp() {
        users = Object.entries(await loadData('users'));
        let email = document.getElementById('email').value.toLowerCase();
        let user = users.find(u => u[1].mail == email);            
        if(user === undefined){  
        matchPassword();
        }else {
            document.getElementById('mailError').classList.remove('hidden');  
        }
}


/**
* Matches the password and the confirmed password, and adds the user if they match.
 *
 * This asynchronous function retrieves the password and confirmed password from the input fields,
 * compares them, and if they match, it adds the user to the database and initiates the signup process.
 * If they don't match, it displays an error message.
 */

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


/**
 * Displays a success message after successful signup and redirects to the index page.
 *
 * This function modifies the appearance of the signup button and success message to indicate successful signup.
 * It then redirects the user to the index page after a delay.
 */

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


/**
 * Changes the focus to the name input field and updates the styling.
 *
 * This function adds a CSS class to the name input field container to indicate focus,
 * and removes CSS classes from other input field containers.
 */

function changeName() {
    document.getElementById('nameContainer').classList.add('password_container_border');
    document.getElementById('emailContainer').classList.remove('password_container_border');
    document.getElementById('passwordButten').classList.remove('password_container_border');
    document.getElementById('confirmPasswordButten').classList.remove('password_container_border');
}


/**
 * Changes the focus to the email input field and updates the styling.
 *
 * This function adds a CSS class to the email input field container to indicate focus,
 * and removes CSS classes from other input field containers.
 */


function changeEmail() {
    document.getElementById('nameContainer').classList.remove('password_container_border');
    document.getElementById('emailContainer').classList.add('password_container_border');
    document.getElementById('passwordButten').classList.remove('password_container_border');
    document.getElementById('confirmPasswordButten').classList.remove('password_container_border');
}


/**
 * Changes the focus to the password input field and updates the styling.
 *
 * This function modifies the styling of the password input field container to indicate focus,
 * while resetting the styling of other input field containers.
 * It also toggles the visibility of the password based on its current type.
 *
 */

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


/**
 * Changes the focus to the confirm password input field and updates the styling.
 *
 * This function modifies the styling of the confirm password input field container to indicate focus,
 * while resetting the styling of other input field containers.
 * It also toggles the visibility of the confirm password based on its current type.
 *
 */

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
      document.getElementById('notSee').classList.add('hidden');
      
    } else {
      x.type = "password";
      document.getElementById('lock').classList.add('hidden');
      document.getElementById('notSee').classList.remove('hidden');
    }
  }


  /**
   * Toggles the visibility of the confirm password input field and updates the visibility icon.
   * 
   * This function toggles the visibility of the confirm password input field between hidden and visible states.
   * It also updates the visibility icon accordingly.
   * 
   */

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

  
  /**
   *  Displays a success message.
   * 
   *  This function removes the 'hidden' class from the success message element to make it visible,
   *  and adds the 'animate' class to apply any animation styles if needed.
   * 
   */

  function showMessage() {
    const message = document.getElementById('successMessage');
    message.classList.remove('hidden');
    message.classList.add('animate');
  }