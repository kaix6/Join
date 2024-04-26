function showDialog(classDialogBg, classDialog, showClassDialog, time) {
    document.querySelector(`${classDialogBg}`).classList.toggle('d_none');
    setTimeout(function() {
        document.querySelector(`${classDialog}`).classList.toggle(`${showClassDialog}`);
    }, time);
}


function closeDialog(classDialog, showClassDialog, classDialogBg, time) {
    document.querySelector(`${classDialog}`).classList.remove(`${showClassDialog}`);
    setTimeout(function() {
        document.querySelector(`${classDialogBg}`).classList.add('d_none');
    }, time);
}


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



