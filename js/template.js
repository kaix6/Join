function showSubmenuHeader() {
    if(currentElementDisplayStyleNone()) {
        document.querySelector('.submenu_header_mobile').classList.toggle('show_submenu_header');
    } else {
        document.querySelector('.submenu_header').classList.toggle('show_submenu_header');
    }
}


function proveElementStyle(element) {
    return element.currentStyle ? element.currentStyle.display : getComputedStyle(element).display; // Wenn das currentStyle-Attribut definiert ist wird der Wert des Displays über element.currentStyle.display abgerufen und betrifft den IE, ansonsten über getComputedStyle(element).display
}


function currentElementDisplayStyleNone() {
    return proveElementStyle(document.querySelector('.header_help_icon')) == "none";
}




