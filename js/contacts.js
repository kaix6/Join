let contacts = [];
let sortedContacts = [];
let letters = [];


let colors = ['var(--tagOrange)', 'var(--tagPink)', 'var(--tagPurple)',
              'var(--tagDarkPurple)', 'var(--tagLightBlue)', 'var(--tagTurquoise)',
              'var(--tagApricot)', 'var(--tagLightOrange)', 'var(--tagLightPink)',
              'var(--tagYellow)', 'var(--tagBlue)', 'var(--tagGreen)',
              'var(--taglightYellow)', 'var(--tagRed)', 'var(--tagMediumYellow)',
]
loadContacts();


async function initJSONContacts() {
    let response = await fetch('./js/contacts.json');
    contacts = await response.json();
}


async function renderContacts(filter) {
// die initial contact soll nur einmal initial geladen werden
    if(contacts.length <= 1) {
        await initJSONContacts();
    }
    let contentContacts = document.querySelector('.contacts');
    sortedContacts = sortArray(contacts);
    contentContacts.innerHTML = '';

    for (let i = 0; i < sortedContacts.length; i++) {
        const contact = sortedContacts[i];

/*         let firstLetter = contact['name'].charAt(0); */

/*         if(!filter || filter == firstLetter) { */
            contentContacts.innerHTML += generateContactsInnerHTML(contact, i);
            changeColorContact('#short_name', i, contact.color);
/*         }
        if(!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        } */
/*         renderLetters(i); */
    }
/*     console.log(letters); */
}


function generateContactsInnerHTML(contact, i) {
    return /* HTML */ `
        <div class="letter_content">
            <div id="letter_names${i}" class="letter_names">
<!--                 <p class="head_letters">A</p> -->
            </div>
            <div class="horizontal_line_content">
                <div class="horizontal_line"></div>
            </div>
                <div onclick="toggleContactView(${i})" id="contact${i}" class="contact pointer"> <!-- Vergabe einer ID für JavaScript, wenn in JS gerendert wird -->
                    <div id="short_name${i}" class="short_name round_div">
                        <p class="short_name_text">${contact.letters}</p>
                    </div>
                    <div class="name_data flex_dir_c">
                        <p class="contact_fullName">${contact.name}</p>
                        <p class="contact_mail">${contact.mail}</p>
                    </div>
                </div>
        </div>`;
}


function changeColorContact(id, i, color) {
    let shortName = document.querySelector(`${id}${i}`);
    shortName.style.backgroundColor = color;
}


function sortArray(array) {
    // Mit slice() wird eine Kopie von contacts erstellt und auch nicht überschrieben, somit bleibt die Reihenfolge von contacts unberührt
    let sortedArray = array.slice().sort((a, b) => {
        if(a.name < b.name) {
            return -1;
        }
        if(a.name > b.name) {
            return 1;
        }
        return 0; // Wenn die Namen gleich sind
    })
    return sortedArray;
}


function renderLetters(i) {
        let letterNames = document.querySelector(`#letter_names${i}`);
        letterNames.innerHTML = '';
        for (let j = 0; j < letters.length; j++) {
            const letter = letters[j];
            letterNames.innerHTML += generateLettersInnerHTML(letter);   
/*             console.log(letter); */
        }
}


function generateLettersInnerHTML(letter) {
    return /* HTML */ `
        <p class="head_letters">${letter}</p>`;
}


function toggleContactView(i) {
    // Mobile
    if(currentElementWidth(1110)) {
        document.querySelector('#content_contacts').classList.toggle('d_none');
        document.querySelector('#contact_view').classList.toggle('d_none');
        document.querySelector('.floating_contact').classList.toggle('d_none'); 
    } else {
    // Desktop
        document.querySelector('.floating_contact').classList.add('d_none');
        setTimeout(function() {
            document.querySelector('.floating_contact').classList.add('show_floating_contact_desktop'); 
        }, 0);
    }
    // Check if i is defined - Code is just executed if i is definded
    if (typeof i !== 'undefined') {
        renderFloatingContact(i);
        changeColorContact('#short_name_overview', i, sortedContacts[i].color);
    }
    showActiveContact();

}


function showActiveContact() {
    let activeContact = document.querySelector('.name_overview').textContent;
    let contacts = document.querySelectorAll('.contact_fullName');

    contacts.forEach(contact => {
        let parentElement = contact.closest('.contact'); // closest() gibt das nahegelegenste übergeordnete Element zurück
        parentElement.classList.remove('active_contact');
        if (contact.textContent.includes(`${activeContact}`)) {
            parentElement.classList.add('active_contact');
        }
    })
}


function renderFloatingContact(i) {
    let floatingContact = document.querySelector('.floating_contact');
    floatingContact.innerHTML = generateFloatingContactInnerHTML(i);
}


function generateFloatingContactInnerHTML(i) {
    return /* HTML */ `
        <div onclick="showContactOptions(${i})" class="add_change_btn_mobile hide_desktop pointer">
            <img class="add_person_more_icon" src="assets/img/contacts/more_vert.svg" alt="add person icon">
        </div>
        <div class="head_floating_content">
            <div id="short_name_overview${i}" class="short_name_overview round_div">
                <p class="short_name_text_overview">${sortedContacts[i].letters}</p>
            </div>
        <div class="name_editable_content">
            <h3 class="name_overview">${sortedContacts[i].name}</h3>
            <div class="editable_content">
                <div onclick="showDialog('.dialog_edit_contact_bg', 'd_none', '.dialog_edit_contact', 'show_dialog_edit_contact', 0)" class="edit_content pointer">
                    <img class="contact_edit_icon img_width24" src="assets/img/contacts/edit.svg" alt="edit icon">
                    <p>Edit</p>
                </div>
                <div onclick="deleteContact(${i})" class="delete_content pointer">
                    <img class="contact_delete_icon img_width24" src="assets/img/contacts/delete.svg" alt="delete icon">
                    <p>Delete</p>
                </div>
            </div>
        </div>
        </div>
        <p class="text_information">Contact Information</p>
        <div class="contact_information">
            <div class="contact_overview_mail">
                <h4>Email</h4>
                <p class="overview_mail">${sortedContacts[i].mail}</p>
            </div>
            <div class="contact_overview_phone">
                <h4>Phone</h4>
                <p>${sortedContacts[i].phone}</p>
            </div>
        </div>`;
}


function showContactOptions(i) {
    let contactOptionsMobile = document.querySelector('.contact_options_mobile');
    contactOptionsMobile.innerHTML = generateContactOptionsInnerHTML(i);
    document.querySelector('.contact_options_mobile').classList.add('show_contact_options_mobile');

}


function generateContactOptionsInnerHTML(i) {
    return /*HTML*/ `
        <div onclick="showDialog('.dialog_edit_contact_bg', 'd_none', '.dialog_edit_contact', 'show_dialog_edit_contact', 50); closeContactOptions(event)" class="edit_content pointer">
            <img class="contact_edit_icon img_width24" src="assets/img/contacts/edit.svg" alt="edit icon">
            <p>Edit</p>
        </div>
        <div onclick="deleteContact(${i})" class="delete_content pointer">
            <img class="contact_delete_icon img_width24" src="assets/img/contacts/delete.svg" alt="delete icon">
            <p>Delete</p>
        </div> `;
}


function closeContactOptions(event) {
    if(event.target.className != 'add_person_more_icon') 
    document.querySelector('.contact_options_mobile').classList.remove('show_contact_options_mobile');
}


function currentElementWidth(number) {
    return proveElementWidth(document.querySelector('.wrapped_maxWidth')) <= number;
}


function getRandomItem(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    let item = array[randomIndex];
    return item;
}


// Evtl. auch die Anfangsbuchstaben im json array übernehmen und die unten stehende Funktion nur beim Neuanlegen oder editieren anwenden wie auch bei color : getRandomItem(colors);

function getContactsInitials(name) {
    let splitName = name.split(/(\s+)/);
    firstInitial = splitName[0].charAt(0);
    if(splitName.length > 2) {
        secondInitial = splitName[splitName.length - 1].charAt(0);
        let mergeLetters = firstInitial + secondInitial;
        let initialLetters = capitalize(mergeLetters);
        return initialLetters;
    }
    let initialLetters = capitalize(firstInitial);
    return initialLetters;
} 


function capitalize(string) {
    let capitalizedString = string.toUpperCase();
    return capitalizedString;
}


// Add new Contact


function addContact() {
    let fullName = document.querySelector('#fullName');
    let mail = document.querySelector('#mail');
    let telNumber = document.querySelector('#telNumber');
    let colorAllocation = getRandomItem(colors);
    let firstLetters = getContactsInitials(fullName.value);
    contacts.push({name: capitalizeFirstLetters(fullName.value), mail: mail.value, phone: telNumber.value, color: colorAllocation, letters: firstLetters});
    renderContacts();
    closeDialog('.dialog_add_contact', 'show_dialog_add_contact', '.dialog_add_contact_bg', 'd_none', 0);
    // findIndex überprüft hier das Array sortedContacts, ob das aktuelle Element in sortedContacts gleich dem des letzten Elements aus dem Array contacts ist - Falls true, gibt es diesen index an den Parameter i zurück
    toggleContactView(sortedContacts.findIndex(contact => contact === contacts[contacts.length - 1]));
    showCreateContactDoneShort();
    saveContacts();

    fullName.value = '';
    mail.value = '';
    telNumber.value = '';
}


function showCreateContactDoneShort() {
        document.querySelector('.create_contact_done').classList.add('show_create_contact_done');
        setTimeout(function() {
            document.querySelector('.create_contact_done').classList.remove('show_create_contact_done');
         }, 800); 
}


function capitalizeFirstLetters(name) {
    return name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}


/* let btnAddContact = document.querySelector('.add_contact_btn');
btnAddContact.addEventListener('click', (event) => {
    event.preventDefault();
    addContact();
}); */


// Delete Contact


function deleteContact(index) {
    contacts.splice(contacts.findIndex(contact => contact === sortedContacts[index]), 1);
    renderContacts();
    saveContacts();
    // Mobile
    if(currentElementWidth(1110)) {
        document.querySelector('#content_contacts').classList.toggle('d_none');
        document.querySelector('#contact_view').classList.toggle('d_none');
        document.querySelector('.floating_contact').classList.toggle('d_none'); 
        closeContactOptions(event);
    } else {
    // Desktop
        document.querySelector('.floating_contact').classList.toggle('d_none'); 
        document.querySelector('.floating_contact').classList.toggle('show_floating_contact_desktop'); 
    }
}


