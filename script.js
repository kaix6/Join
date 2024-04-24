async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    changeClassToActive();
    hideHelpIcon();
}


function changeClassToActive() {
    let activePage = window.location.pathname;
    let menuLinks = document.querySelectorAll('.menu_icon_text');
    menuLinks.forEach(link => {
        if (link.href.includes(`${activePage}`)) {
            link.classList.add('activeLink');
        }
    })
}


function doNotClose(event) {
    event.stopPropagation();
}


function proveElementStyle(element) {
    return element.currentStyle ? element.currentStyle.display : getComputedStyle(element).display; // Wenn das currentStyle-Attribut definiert ist wird der Wert des Displays über element.currentStyle.display abgerufen und betrifft den IE, ansonsten über getComputedStyle(element).display
}


function proveElementWidth(element) {
    let elementWidth = element;
    let rect = elementWidth.getBoundingClientRect();
    return rect.width;
}


function showDialog(classDialogBg, classD_none, classDialog, showClassDialog, time) {
    document.querySelector(`${classDialogBg}`).classList.toggle(`${classD_none}`);
    setTimeout(function() {
        document.querySelector(`${classDialog}`).classList.toggle(`${showClassDialog}`);
    }, time);
}


function closeDialog(classDialog, showClassDialog, classDialogBg, classD_none, time) {
    document.querySelector(`${classDialog}`).classList.remove(`${showClassDialog}`);
    setTimeout(function() {
        document.querySelector(`${classDialogBg}`).classList.add(`${classD_none}`);
    }, time);
}

