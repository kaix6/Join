let contacts = [];
let sortedContacts = [];


let colors = ['var(--tagOrange)', 'var(--tagPink)', 'var(--tagPurple)',
    'var(--tagDarkPurple)', 'var(--tagLightBlue)', 'var(--tagTurquoise)',
    'var(--tagApricot)', 'var(--tagLightOrange)', 'var(--tagLightPink)',
    'var(--tagYellow)', 'var(--tagBlue)', 'var(--tagGreen)',
    'var(--taglightYellow)', 'var(--tagRed)', 'var(--tagMediumYellow)',
]


/**
 * This function loads contacts data by calling the loadData function with the 'contacts' path.
 * It then converts the retrieved data into an array of key-value pairs using Object.entries().
 * Finally, it calls the render function to render the contacts data on the UI. 
 */
async function loadContacts() {
    contacts = Object.entries(await loadData('contacts'));
    renderContacts();
}


/**
 * This funcion renders the contacts based on the specified filter.
 * If the contacts have not been initialized yet, it first initializes them by calling the 'initialLoadContactsFirebase()' function.
 * It then sorts the contacts alphabetically, clears the existing content in the '.contacts' element, and iterates through the sorted contacts array to generate the HTML content.
 * @param {string|null} filter - The filter letter to render contacts for. If null, all contacts are rendered. 
 */
async function renderContacts(filter) {
    if (contacts.length <= 1) { // die initial contact soll nur einmal initial geladen werden
        initialLoadContactsFirebase();
    }
    let contentContacts = document.querySelector('.contacts');
    sortedContacts = sortArray(contacts);
    contentContacts.innerHTML = '';
    let prevLetter = null;
    
    for (let i = 0; i < sortedContacts.length; i++) {
        const contact = sortedContacts[i][1];
        let firstLetter = contact['name'].charAt(0);
        prevLetter = generateLetterIfNeeded(contentContacts, i, firstLetter, prevLetter, filter);
        contentContacts.innerHTML += generateContactsInnerHTML(contact, i);
        changeColorContact('#short_name', i, contact.color);
    }
}


/**
 * This function generates a letter HTML element if needed based on the specified filter and the previous letter.
 * @param {HTMLElement} contentContacts - The HTML element where the contacts are rendered.
 * @param {number} i - The index of the current contact in the sorted contacts array.
 * @param {string} firstLetter - The first letter of the current contact's name.
 * @param {string} prevLetter - The previous rendered letter.
 * @param {string|null} filter - The filter letter for rendering contacts. If null, all contacts are rendered.
 * @returns {string} - The updated value for the previous letter.
 */
function generateLetterIfNeeded(contentContacts, i, firstLetter, prevLetter, filter) {
    if ((!filter || filter == firstLetter) && firstLetter !== prevLetter) {
        contentContacts.innerHTML += generateLettersInnerHTML(i, firstLetter);
        prevLetter = firstLetter;
    }
    return prevLetter;
}


/**
 * This function changes the background color of the specified element based on the color in the array 'contacts'
 * @param {string} id - The ID selector of the element to change the background color.
 * @param {number} i - The index used to access to the unique ID for the element.
 * @param {string} color - The color value to set as the background color.
 */
function changeColorContact(id, i, color) {
    let shortName = document.querySelector(`${id}${i}`);
    shortName.style.backgroundColor = color;
}


/**
 * This function sorts an array alphabetically based on the 'name' property.
 * @param {array} array - The array to be sorted.
 * @returns {array} - Returns a new sorted array
 */
function sortArray(array) {
    // Mit slice() wird eine Kopie von contacts erstellt und auch nicht überschrieben, somit bleibt die Reihenfolge von contacts unberührt
    let sortedArray = array.slice().sort((a, b) => {
        if (nameIsGreaterThan(a, b)) {
            return -1;
        }
        if (nameIsLessThan(a, b)) {
            return 1;
        }
        return 0; // Wenn die Namen gleich sind
    })
    return sortedArray;
}


/**
 * This function toggles the contact view based on the current window width and a specified index.
 * @param {number} i - The index of the contact to render the current contact data.
 */
function toggleContactView(i) {
    if (currentElementWidth(1110)) {
        showContactMobile();
    } else {
        showContactDesktop();
    }
    if (typeIsDefined(i)) {
        renderFloatingContact(i);
        changeColorContact('#short_name_overview', i, sortedContacts[i][1].color);
    }
    if (!currentElementWidth(1110)) {
        showActiveContact();
    }
}


/**
 * This function shows the active contact in the contact list by adding the class 'active_contact' to higlight the element.
 */
function showActiveContact() {
    let activeContactName = document.querySelector('.name_overview').textContent;
    let activeContactMail = document.querySelector('.overview_mail').textContent;
    let contacts = document.querySelectorAll('.contact'); // Select all contact elements
    contacts.forEach(contact => {
        let contactName = contact.querySelector('.contact_fullName').textContent;
        let contactMail = contact.querySelector('.contact_mail').textContent;
        contact.classList.remove('active_contact');
        if (elementContainsActiveContact(contactName, activeContactName, contactMail, activeContactMail)) {
            contact.classList.add('active_contact');
        }
    });
}


/**
 * This function renders the contact view based on the specified index by generate the HTML content.
 * @param {number} i - The index of the contact to render in the floating contact view.
 */
function renderFloatingContact(i) {
    let floatingContact = document.querySelector('.floating_contact');
    floatingContact.innerHTML = generateFloatingContactInnerHTML(i);
}


/**
 * This function generates and displays the contact options for a specific contact.
 * @param {number} i - The index of the contact for which to display the options.
 */
function showContactOptions(i) {
    let contactOptionsMobile = document.querySelector('.contact_options_mobile');
    contactOptionsMobile.innerHTML = generateContactOptionsInnerHTML(i);
    document.querySelector('.contact_options_mobile').classList.add('show_contact_options_mobile');
}


/**
 * This function closes the contact options menu.
 * If the event target does not have the class 'add_person_more_icon', it removes the class 'show_contact_options_mobile' from the element with the class 'contact_options_mobile' to hide the menu.
 * @param {*} event - The event object representing the event where the function is triggered.
 */
function closeContactOptions(event) {
    if (classIsNotAddPersonMoreIcon(event))
        document.querySelector('.contact_options_mobile').classList.remove('show_contact_options_mobile');
}


/**
 * This function returns a random item from the selected array.
 * @param {array} array - The array from which to select a random item.
 * @returns {*} - Returns a random item from the array.
 */
function getRandomItem(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    let item = array[randomIndex];
    return item;
}


/**
 * This function cuts the initials of a contact's name aout and returns them.
 * @param {string} name - THe name of the contact. 
 * @returns {string} - Returns the initials of the contact's name.
 */
function getContactsInitials(name) {
    let splitName = name.split(/(\s+)/);
    firstInitial = splitName[0].charAt(0);
    if (stringIsLongEnough(splitName)) {
        secondInitial = splitName[splitName.length - 1].charAt(0);
        let mergeLetters = firstInitial + secondInitial;
        let initialLetters = capitalize(mergeLetters);
        return initialLetters;
    }
    let initialLetters = capitalize(firstInitial);
    return initialLetters;
}


/**
 * The function capitalizes the provided string. 
 * @param {string} string - The string to capitalize.
 * @returns {string} - Returns the capitalized string.
 */
function capitalize(string) {
    let capitalizedString = string.toUpperCase();
    return capitalizedString;
}


/**
 * This function opens the dialog for adding a new contact. but clears the input fields for contact values.
 */
function openAddContact() {
    showDialog('.dialog_add_contact_bg', 'd_none', '.dialog_add_contact', 'show_dialog_add_contact', 50);
    clearDataContactValues();
}


/**
 * This function adds a new contact to the array 'contacts' based on the user input.
 * It retrieves the input values for full name, email, and phone number from the corresponding input fields.
 * It generates a random color allocation for the contact, initializes the contact's initials, and pushes
 * the new contact object to the 'contacts' array. After adding the contact, it triggers the rendering
 * of the updated contacts list, closes the add contact dialog, and shows a confirmation message.
 */
async function addContact() {
    let fullName = document.querySelector('#fullName');
    let mail = document.querySelector('#mail');
    let telNumber = document.querySelector('#telNumber');
    let colorAllocation = getRandomItem(colors);
    let firstLetters = getContactsInitials(fullName.value);
    await postData(`contacts`, { name: capitalizeFirstLetters(fullName.value), mail: mail.value, phone: telNumber.value, color: colorAllocation, letters: firstLetters });
    await updateArrayContacts();
    closeDialog('.dialog_add_contact', 'show_dialog_add_contact', '.dialog_add_contact_bg', 'd_none', 0);
    // findIndex überprüft hier das Array sortedContacts, ob das aktuelle Element in sortedContacts gleich dem des letzten Elements aus dem Array contacts ist - Falls true, gibt es diesen index an den Parameter i zurück
    toggleContactView(sortedContacts.findIndex(contact => contact === contacts[contacts.length - 1]));
    showCreateContactDoneShort();
    fullName.value = '';
    mail.value = '';
    telNumber.value = '';
}


/**
 * This function clears the input fields for adding or editing a contact.
 */
function clearDataContactValues() {
    document.querySelector('#fullName').value = '';
    document.querySelector('#mail').value = '';
    document.querySelector('#telNumber').value = '';
}

/**
 * This function displays a short confirmation message after successfully adding a contact.
 * It adds the class 'show_create_contact_done' to the element with the class 'create_contact_done' to show the message and removes it after a short delay.
 */
function showCreateContactDoneShort() {
    document.querySelector('.create_contact_done').classList.add('show_create_contact_done');
    setTimeout(function () {
        document.querySelector('.create_contact_done').classList.remove('show_create_contact_done');
    }, 800);
}


/**
 * The function capitalizes the first letter of each word in the provided string.
 * @param {string} name - The string to capitalize.
 * @returns {string} - Returns the modified string with the first letter of each word capitalized.
 */
function capitalizeFirstLetters(name) {
    return name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}


/**
 * This functions opens the edit contact dialog for the specified contact based on the provided index.
 * @param {*} event - The event object representing the event where the function is triggered.
 * @param {number} index - The index of the contact to edit.
 */
function editContact(event, index) {
    if (currentElementWidth(1110)) {
        showDialog('.dialog_edit_contact_bg', 'd_none', '.dialog_edit_contact', 'show_dialog_edit_contact', 50);
        closeContactOptions(event);
    } else {
        showDialog('.dialog_edit_contact_bg', 'd_none', '.dialog_edit_contact', 'show_dialog_edit_contact', 0);
    }
    let dialogEditContact = document.querySelector('.dialog_edit_contact_bg');
    dialogEditContact.innerHTML = generateDialoEditInnerHTML(index);
    changeColorContact('#create_contact_short_name_edit', index, sortedContacts[index][1].color);
    showSavedData(index);
}


/**
 * This function displays the saved data for the specified contact in the edit contact dialog.
 * @param {number} index - The index of the contact whose data to display.
 */
function showSavedData(index) {
    document.querySelector('#fullName_edit').value = `${sortedContacts[index][1].name}`;
    document.querySelector('#mail_edit').value = `${sortedContacts[index][1].mail}`;
    document.querySelector('#telNumber_edit').value = `${sortedContacts[index][1].phone}`;
}


/**
 * This function saves the edited data for the specified contact in the contacts array
 * @param {number} index - The index of the contact whose data has been edited.
 */
async function saveNewData(index) {
    let newName = document.querySelector('#fullName_edit');
    let newMail = document.querySelector('#mail_edit');
    let newTelNumber = document.querySelector('#telNumber_edit');
    let currentIndex = contacts.findIndex(contact => contact === sortedContacts[index]);

    await editData(`contacts/${contacts[currentIndex][0]}`, {name: newName.value, mail: newMail.value, phone: newTelNumber.value, letters: getContactsInitials(newName.value)});
    await updateArrayContacts();
    closeDialog('.dialog_edit_contact', 'show_dialog_edit_contact', '.dialog_edit_contact_bg', 'd_none', 100);
    toggleContactView(sortedContacts.findIndex(contact => contact === contacts[currentIndex]));
}


/**
 * This function deletes the specified contact from the array 'contacts' based on the provided index.
 * @param {number} index - The index of the contact to delete.
 */
async function deleteContact(event, index) {
    let currentIndex = contacts.findIndex(contact => contact === sortedContacts[index]);
    await deleteData(`contacts/${contacts[currentIndex][0]}`);
    await updateArrayContacts();
    if (currentElementWidth(1110)) {
        showContactMobile();
        closeContactOptions(event);
    } else { // Desktop
        document.querySelector('.floating_contact').classList.toggle('d_none');
        document.querySelector('.floating_contact').classList.toggle('show_floating_contact_desktop');
    }
    if(document.querySelector('.show_dialog_edit_contact')) {
        closeDialog('.dialog_edit_contact', 'show_dialog_edit_contact', '.dialog_edit_contact_bg', 'd_none', 0);
    }
}


/**
 * This function toggles the visibility of the contact view for mobile devices.
 */
function showContactMobile() {
    document.querySelector('#content_contacts').classList.toggle('d_none');
    document.querySelector('#contact_view').classList.toggle('d_none');
    document.querySelector('.floating_contact').classList.toggle('d_none');
}


/**
 * This function displays the contact view for desktop devices.
 */
function showContactDesktop() {
    document.querySelector('.floating_contact').classList.add('d_none');
    setTimeout(function () {
        document.querySelector('.floating_contact').classList.add('show_floating_contact_desktop');
    }, 0);
}


/**
 * This function updates the 'contacts' array by fetching data from the server and re-renders the contacts.
 */
async function updateArrayContacts() {
    contacts = Object.entries(await loadData('contacts'));
    renderContacts();
}


/**
 * This function compares the names of two objects 'a' and 'b' and determines if the name of object 'a' comes alphabetically after the name of object 'b'.
 * @param {*} a - The first object to compare.
 * @param {*} b - The second object to compare.
 * @returns {boolean} - Returns true if the name of 'a' comes after the name of 'b' alphabetically, otherwise false.
 */
function nameIsGreaterThan(a, b) {
    return a[1].name < b[1].name;
}


/**
 * This function compares the names of two objects 'a' and 'b'.
 * @param {*} a - The first object to compare.
 * @param {*} b - The second object to compare.
 * @returns {boolean} - Returns true if the name of 'a' comes before the name of 'b' alphabetically, otherwise false.
 */
function nameIsLessThan(a, b) {
    return a[1].name > b[1].name;
}


/**
 * This functions checks if the specified variable is defined or not.
 * @param {number} i - The variable to check if it is defined.
 * @returns {boolean} - Returns true if the variable is defined, otherwise false.
 */
function typeIsDefined(i) {
    return typeof i !== 'undefined'; // Check if i is defined - Code is just executed if i is definded
}


/**
 * This function checks if the specified contact element contains the name and the mail of the active contact.
 * @param {string} contactName - The name of the contact element to check.
 * @param {string} activeContactName - The name of the active contact.
 * @param {string} contactMail - The email of the contact element to check.
 * @param {string} activeContactMail - The email of the active contact.
 * @returns {boolean} - Returns true if the contact element contains both the name and mail of the active contact, otherwise false.
 */
function elementContainsActiveContact(contactName, activeContactName, contactMail, activeContactMail) {
    return contactName === activeContactName && contactMail === activeContactMail;
}


/**
 * This function checks if the target element of the specified event does not have the class 'add_person_more_icon'.
 * @param {*} event - The event object representing the event where the function is triggered.
 * @returns {boolean} - Returns true if the target element of the event does not have the class 'add_person_more_icon', otherwise false.
 */
function classIsNotAddPersonMoreIcon(event) {
    return event.target.className != 'add_person_more_icon';
}


/**
 * This function checks if the length of the specified string is greater than 2 characters.
 * @param {string} string - The string to check its length.
 * @returns {boolean} - Returns true if the length of the specified string is greater than 2, otherwise false.
 */
function stringIsLongEnough(string) {
    return string.length > 2;
}


/**
 * This function checks if the width of the specified element is less than or equal to the given number.
 * @param {number} number - The threshold width to compare with.
 * @returns {boolean} - Returns true if the width of the specified element is less than or equal to the given number, otherwise false.
 */
function currentElementWidth(number) {
    return proveElementWidth(document.querySelector('.wrapped_maxWidth')) <= number;
}