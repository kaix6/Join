function showDialogAddContact() {
    document.querySelector('.dialog_add_edit_contact_bg').classList.toggle('d_none');
    setTimeout(function() {
        document.querySelector('.dialog_add_edit_contact').classList.toggle('show_dialog_add_edit_contact');
    }, 100);
}


function closeshowDialogAddContact() {
    document.querySelector('.dialog_add_edit_contact').classList.remove('show_dialog_add_edit_contact');
    setTimeout(function() {
        document.querySelector('.dialog_add_edit_contact_bg').classList.add('d_none');
    }, 305);
}


function toggleContactView() {
    // Mobile
    if(currentElementDisplayStyleFlex()) {
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
    document.querySelector('.contact_options_mobile').classList.toggle('show_contact_options_mobile');
}
