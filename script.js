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
}


function changeClassToActive() {
    let activePage = window.location.pathname;
    console.log(activePage);
    let menuLinks = document.querySelectorAll('.menu_icon_text a');
    menuLinks.forEach(link => {
        if (link.href.includes(`${activePage}`)) {
            console.log(link);
            document.querySelector('.menu_icon_text').classList.add('activeLink');
            link.classList.add('activeLink');
        }
    })
}