function showSubmenuHeader() {
    if (currentElementDisplayStyleFlex()) {
        document.querySelector('.submenu_header_mobile').classList.toggle('show_submenu_header');
    } else {
        document.querySelector('.submenu_header').classList.toggle('show_submenu_header');
    }
}


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


function hideHelpIcon() {
    let helpIcon = document.querySelector('.header_help_icon');
    let activePage = window.location.pathname;
    if(specificPageIsActive(activePage)) {
        helpIcon.classList.add('d_none');
    } 
}


function currentElementDisplayStyleFlex() {
    return proveElementStyle(document.querySelector('#side_menu')) == "flex";
}


function classContainsShowSubmenuHeader(test) {
    return test.classList.contains('show_submenu_header');
}


function classIsNotTextProfileHeader(event) { //event.target.className gibt die Klasse des Elements zurück, welches angeglickt wurde
    return event.target.className != 'text_profile_header';
}


function specificPageIsActive(page) {
    return page == '/help.html';
}








