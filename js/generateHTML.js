// Board

function generateSmallTaskBox(task){
    return `<div>
        <div id="task-box-small" class="task-box" onclick="showDialogTask()">
            <p id="task-category${task['id']}" class="task-type">${task['category']}</p>
            <p class="task-headline">${task['title']}</p>
            <p class="task-description">${task['description']}</p>
            <div id="subtasks${task['id']}" class="progress-section">
            </div>
            <div class="member-prio-section">
                <div id="task-all-member${task['id']}" class="task-all-member">
                </div>
                <img id="taskPrio${task['id']}" src="/assets/img/add_task/prio_low.svg">
            </div>
        </div>
    </div>`;
}

function generateSubtasksSection(){
    return`
    <div class="progress">
        <div class="progress-bar" style="width: 50%;"></div>
    </div>
    <p class="amount-subtask">1/2 Subtasks</p>
    `;
}

function generateMemberTaskBox(member, memberId){
    return`
    <div id="${memberId}" class="member">${member}</div>
    `;
}

function generateNoTaskBox(){
    return `
    <div class="no-task-div">
        <p>No tasks To do</p>
    </div>`;
}