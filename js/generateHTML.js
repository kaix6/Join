// Board

function generateSmallTaskBox(task, i){
    return `
    <div>
        <div id="task-box-small" class="task-box" onclick="showDialogTask(${i})">
            <div id="task${task['id']}">
            <p id="task-category${task['id']}" class="task-type">${task['category']}</p>
            <p class="task-headline">${task['title']}</p>
            <p id="task-description${task['id']}" class="task-description">${task['description']}</p>
            </div>
            <div class="member-prio-section">
                <div id="task-all-member${task['id']}" class="task-all-member">
                </div>
                <img id="taskPrio${task['id']}" src="/assets/img/add_task/prio_low.svg">
            </div>
        </div>
    </div>
    `;
}

function generateBigTaskBox(task){
    return `
    <div class="d-flex-center-space-btw">
        <p class="task-type">Task Type</p>
        <div class="close-icon" onclick="closeDialogTask()">
            <img src="./assets/img/add_task/close.svg" />
        </div>
    </div>
    <h2>${task['title']}</h2>
    <p class="task-description-big">${task['description']}</p>
    <div>
        <div class="d-flex">
            <p class="width-30">Due date:</p>
            <p>${task['due date']}</p>
        </div>
        <div class="d-flex">
            <p class="width-30">Priority:</p>
            <p>${task['prio']}</p>
            <img id="taskPrioBigBox${task['id']}" class="prio-icon" src="./assets/img/add_task/prio_low.svg" />
        </div>
        <div>
            <p class="margin-top-16px">Assigned To:</p>
        <div class="container-member-big-task">
            <div class="member-big-task">AM</div>
                <p>Name</p>
            </div>
        </div>
        <div>
            <p class="margin-top-16px">Subtasks</p>
        <div class="container-subtasks">
            <input class="subtask-checkbox" type="checkbox" />
            <p>Subtask Name</p>
        </div>
        </div>
        <div class="container-delete-edit">
            <div class="delete">
                <img
                class="delete-edit-icon"
                src="./assets/img/board/icon+delete_black.svg"
                />
            </div>
            <div class="edit">
                <img
                class="delete-edit-icon"
                src="./assets/img/board/icon+edit_black.svg"
                />
            </div>
        </div>
    </div>
    `;
}

function generateSubtasksSection(){
    return`
    <div class="progress-section">
        <div class="progress">
            <div class="progress-bar" style="width: 50%;"></div>
        </div>
        <p class="amount-subtask">1/2 Subtasks</p>
    </div>
    `;
}

function generateMemberTaskBox(member, memberId){
    return`
    <div id="${memberId}" class="member">
        ${member}
    </div>
    `;
}

function generateNoTaskBox(){
    return `
    <div class="no-task-div">
        <p>No tasks To do</p>
    </div>
    `;
}