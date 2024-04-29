let contacts = [];
let sortedCcontacts = [];
let letters = [];


let colors = ['var(--tagOrange)', 'var(--tagPink)', 'var(--tagPurple)',
              'var(--tagDarkPurple)', 'var(--tagLightBlue)', 'var(--tagTurquoise)',
              'var(--tagApricot)', 'var(--tagLightOrange)', 'var(--tagLightPink)',
              'var(--tagYellow)', 'var(--tagBlue)', 'var(--tagGreen)',
              'var(--tagLightYellow)', 'var(--tagRed)', 'var(--tagMediumYellow)',
]


async function initJSONContacts() {
    let response = await fetch('./js/contacts.json');
    contacts = await response.json();
}



async function loadContacts(filter) {
    await initJSONContacts();
    let contentContacts = document.querySelector('.contacts');
    sortedCcontacts = sortArray(contacts);
    contentContacts.innerHTML = '';


    for (let i = 0; i < sortedCcontacts.length; i++) {
        const contact = sortedCcontacts[i];


/*         let firstLetter = contact['name'].charAt(0); */

/*         if(!filter || filter == firstLetter) { */
            contentContacts.innerHTML += generateContactsInnerHTML(contact, i);
            changeColorContact('#short_name', i, contact.color);
/*         }
        if(!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
        renderLetters(i); */
    }

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
    let sortedArray = array.sort((a, b) => {
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
            console.log(letter);
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
        document.querySelector('.floating_contact').classList.toggle('d_none'); // ID muss hier noch angepasst werden mit '#floating_contact${}'
    } else {
    // Desktop
        document.querySelector('.floating_contact').classList.toggle('d_none');
        setTimeout(function() {
            document.querySelector('.floating_contact').classList.toggle('show_floating_contact_desktop'); 
        }, 0);
    }
    renderFloatingContact(i);
    changeColorContact('#short_name_overview', i, sortedCcontacts[i].color);
}


function renderFloatingContact(i) {
    let floatingContact = document.querySelector('.floating_contact');
    floatingContact.innerHTML = generateFloatingContactInnerHTML(i);
}


function generateFloatingContactInnerHTML(i) {
    return /* HTML */ `
        <div class="head_floating_content">
            <div id="short_name_overview${i}" class="short_name_overview round_div">
                <p class="short_name_text_overview">${sortedCcontacts[i].letters}</p>
            </div>
        <div class="name_editable_content">
            <h3 class="name_overview">${sortedCcontacts[i].name}</h3>
            <div class="editable_content">
                <div onclick="showDialog('.dialog_edit_contact_bg', 'd_none', '.dialog_edit_contact', 'show_dialog_edit_contact', 0)" class="edit_content pointer">
                    <img class="contact_edit_icon img_width24" src="assets/img/contacts/edit.svg" alt="edit icon">
                    <p>Edit</p>
                </div>
                <div class="delete_content pointer">
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
                <p class="overview_mail">${sortedCcontacts[i].mail}</p>
            </div>
            <div class="contact_overview_phone">
                <h4>Phone</h4>
                <p>${sortedCcontacts[i].phone}</p>
            </div>
        </div>`;
}


function showContactOptions() {
    document.querySelector('.contact_options_mobile').classList.add('show_contact_options_mobile');
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


// Evtl. auch die Anfangsbuchstaben im json array übernhemen und die unten stehende Funktion nur beim Neuanlegen oder editieren anwenden wie auch bei color : getRandomItem(colors);

function getContactsInitials(name) {
    let splitName = name.split(/(\s+)/);
    firstInitial = splitName[0].charAt(0);
    secondInitial = splitName[splitName.length - 1].charAt(0);
    let mergeLetters = firstInitial + secondInitial;
    let initialLetters = capitalize(mergeLetters);
    return initialLetters;
} 


function capitalize(string) {
    let capitalizedString = string.toUpperCase();
    return capitalizedString;
}


// Add a random color to a new contact

/* color : getRandomItem(colors); */

