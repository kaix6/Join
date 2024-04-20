function showSubmenuHeader() {
    if(currentElementDisplayStyleFlex()) {
        document.querySelector('.submenu_header_mobile').classList.toggle('show_submenu_header');
    } else {
        document.querySelector('.submenu_header').classList.toggle('show_submenu_header');
    }
}


function proveElementStyle(element) {
    return element.currentStyle ? element.currentStyle.display : getComputedStyle(element).display; // Wenn das currentStyle-Attribut definiert ist wird der Wert des Displays über element.currentStyle.display abgerufen und betrifft den IE, ansonsten über getComputedStyle(element).display
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






