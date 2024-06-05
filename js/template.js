/**
 * This function toggles the visibility of the submenu header based on the current display style.
 * If the display style is 'flex', it toggles the visibility of the submenu header for mobile view.
 * If the display style is not 'flex', it toggles the visibility of the submenu header for desktop view.
 */
function showSubmenuHeader(event) {
    event.stopPropagation(); // Prevents the event from bubbling up to the parent elements
    if (currentElementDisplayStyleFlex()) {
        document.querySelector('.submenu_header_mobile').classList.toggle('show_submenu_header');
    } else {
        document.querySelector('.submenu_header').classList.toggle('show_submenu_header');
    }
}


/**
 * This function closes the submenu dialog when triggered by an event.
 * It removes the 'show_submenu_header' class from all submenu headers with the class 'submenu_header_style' if the event target does not have the class 'text_profile_header'.
 * @param {object} event - The event object representing the event that triggered the function.
 */
function closeSubmenuHeader(event) {
    let submenuHeaders = document.querySelectorAll('.submenu_header_style');
    submenuHeaders.forEach((submenuHeader) => {
        if(classContainsShowSubmenuHeader(submenuHeader)) {
            if(classIsNotTextProfileHeader(event)) { 
                submenuHeader.classList.remove('show_submenu_header');
            }
        }
    })
}


/**
 * This function hides the help icon <img> with the class 'header_help_icon' if the current page is 'help.html' by adding the class 'd_none'
 */
function hideHelpIcon() {
    let helpIcon = document.querySelector('.header_help_icon');
    let activePage = window.location.pathname;
    if(specificPageIsActive(activePage)) {
        helpIcon.classList.add('d_none');
    } 
}


/**
 * Checks if the display style of a specified element is 'flex'.
 * @returns {boolean} - Returns true if the display style of the element is 'flex', otherwise false.
 */
function currentElementDisplayStyleFlex() {
    return proveElementStyle(document.querySelector('#side_menu')) == "flex";
}


/**
 * The function checks if the specified element contains the class 'show_submenu_header'.
 * @param {*} element - The element to check of the class 'show_submenu_header'.
 * @returns {boolean} - Returns true if the class 'show_submenu_header' is present in the element, otherwise false.
 */
function classContainsShowSubmenuHeader(element) {
    return element.classList.contains('show_submenu_header');
}


/**
 * The function checks if the target element of the specified event does not have the class 'text_profile_header'.
 * @param {object} event - The event object representing the event where the function is triggered.
 * @returns {boolean} -Returns true if target element of the event does not have the class 'text_profile_header', otherwise false.
 */
function classIsNotTextProfileHeader(event) { //event.target.className gibt die Klasse des Elements zurück, welches angeglickt wurde
    return event.target.className != 'text_profile_header';
}


/**
 * Checks if the specified page is the active page.
 * @param {string} page - The URL of the page to check if it's active.
 * @returns {boolean} - Returns true if the specified page has the URL 'help.html', otherwise false.
 */
function specificPageIsActive(page) {
    return page == '/help.html';
}







