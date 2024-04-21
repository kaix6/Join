function showSubmenuHeader() {
    if(currentElementDisplayStyleFlex()) {
        document.querySelector('.submenu_header_mobile').classList.toggle('show_submenu_header');
    } else {
        document.querySelector('.submenu_header').classList.toggle('show_submenu_header');
    }
}


function closeSubmenuHeader(event) {
    let submenuHeaders = document.querySelectorAll('.submenu_header_style');

    submenuHeaders.forEach((submenuHeader) => {
        if(submenuHeader.classList.contains('show_submenu_header')) {
            if(event.target.className != 'text_profile_header') { //event.target.className gibt die Klasse des Elements zurück, welches angeglickt wurde
                submenuHeader.classList.remove('show_submenu_header');
            }
        }  
    })
}


function currentElementDisplayStyleFlex() {
    return proveElementStyle(document.querySelector('#side_menu')) == "flex";
}





