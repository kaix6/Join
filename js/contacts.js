let contacts = [];


let colors = ['var(--tagOrange)', 'var(--tagPink)', 'var(--tagPurple)',
              'var(--tagDarkPurple)', 'var(--tagLightBlue)', 'var(--tagTurquoise)',
              'var(--tagApricot)', 'var(--tagLightOrange)', 'var(--tagLightPink)',
              'var(--tagYellow)', 'var(--tagBlue)', 'var(--tagGreen)',
              'var(--tagLightYellow)', 'var(--tagRed)', 'var(--tagMediumYellow)',
]


function toggleContactView() {
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


async function initJSONContacts() {
    let response = await fetch('./js/contacts.json');
    contacts = await response.json();

    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];
        let initials = getContactsInitials(element.name);
        return initials;
    }
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

