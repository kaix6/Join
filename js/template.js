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


function hideHelpIcon() {
    let helpIcon = document.querySelector('.header_help_icon');
    let activePage = window.location.pathname;
    if(activePage == '/help.html') {
        helpIcon.classList.add('d_none');
    } 
}

function smallTaskBox(){
    return `<div>
        <div id="task-box-small" class="task-box" onclick="showDialogTask()">
            <p class="task-type">Task Type</p>
            <p class="task-headline">Task Headline</p>
            <p class="task-description">Task Description</p>
            <div class="progress-section">
                <div class="progress">
                    <div class="progress-bar" style="width: 50%;"></div>
                </div>
                <p class="amount-subtask">1/2 Subtasks</p>
            </div>
            <div class="member-prio-section">
                <div class="task-all-member">
                    <div class="member">AM</div>
                    <div class="member">EM</div>
                </div>
                <img src="/assets/img/add_task/prio_low.svg">
            </div>
        </div>
    </div>`;
}

function generateSmallTaskBox(){
    return `
    <div class="no-task-div">
        <p>No tasks To do</p>
    </div>`;
}





