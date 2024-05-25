let currentDraggedTask;
let allTasks;

// * Drag & Drop Start * //

function startDraggin(id) {
    currentDraggedTask = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(newStatus) {
    allTasks[currentDraggedTask][1]['status'] = newStatus;
    // await editData(`tasks/${allTasks[currentDraggedTask][1]}`, {status: newStatus.value});
    updateTasksHTML(allTasks);
}

function highlight(id) {
    document.getElementById(id).classList.add('board-column-highlight');
}

function removeHighlightLeave(id) {
    document.getElementById(id).classList.remove('board-column-highlight');
}

function removeHighlightEnd(id) {
    document.getElementById(id).classList.remove('board-column-highlight');
}

// * Drag & Drop End * //

async function showDialogTask(i) {
    let bigTaskBox = document.getElementById('task-box-big');
    let currentTask = allTasks.filter(t => t[1]['id'] == i);
    await animationDialogTask();
    bigTaskBox.innerHTML = '';
    bigTaskBox.innerHTML += generateBigTaskBox(currentTask);
    getAllMembersBigTask(currentTask);
    setPriorityBigTask(currentTask);
    setTaskCategoryBigTask(currentTask);
    getAllSubtasksBigTask(currentTask);
    getDivHeight(currentTask);
}

/**
 * This function converts a date string from "YYYY-MM-DD" format to "DD/MM/YYYY" format.
 * @param {string} date - The date string in "YYYY-MM-DD" format.
 * @returns {string} - The date string in "DD/MM/YYYY" format.
 */
function convertDate(date) {
    let splittedDate = date.split("-");
    let newDate = [splittedDate[2], splittedDate[1], splittedDate[0]];
    return newDate.join("/");
}

function getDivHeight() {
    let bigTaskBox = document.querySelector('.task-box-big');
    let viewportWithoutNavi = window.innerHeight - 83;
    let height = bigTaskBox.offsetHeight;
    let gapHeight = (viewportWithoutNavi - height);
    changeTaskBoxHeight(gapHeight, height);
}

function changeTaskBoxHeight(gapHeight, height) {
    if (gapHeight < -1) {
        var r = document.querySelector(':root');
        let newHeight = 'calc(100% - 80px - 83px)';
        r.style.setProperty('--height', newHeight);
    } else {
        var r = document.querySelector(':root');
        let newHeight = height;
        r.style.setProperty('--height', newHeight);
    }
};

// wenn die neue Height negativ ist, dann minus fixen Wert --> calc(100% - 80px - 83px)

function getAllMembersBigTask(currentTask) {
    let memberContainer = document.getElementById('container-member-big-task');
    let taskAllMembers = currentTask[0][1]['assigned member'];
    for (let i = 0; i < taskAllMembers.length; i++) {
        const currentTaskMember = taskAllMembers[i];
        memberContainer.innerHTML += generateMemberBigTaskBox(currentTaskMember);
        setColorMemberBigTask(currentTaskMember);
    };
}

function setColorMemberBigTask(currentTaskMember) {
    let colorMember = currentTaskMember['color'];
    let memberContainer = document.getElementById(`member-letter-cirlce${currentTaskMember['id']}`);
    memberContainer.style.backgroundColor = colorMember;
}

function setPriorityBigTask(currentTask) {
    let taskPrio = currentTask[0][1]['prio'];
    if (taskPrio == 'low') {
        document.getElementById(`taskPrioBigBox${currentTask[0][1]['id']}`).src = './assets/img/add_task/prio_low.svg';
    } else {
        if (taskPrio == 'medium') {
            document.getElementById(`taskPrioBigBox${currentTask[0][1]['id']}`).src = './assets/img/add_task/prio_medium.svg';
        } else {
            document.getElementById(`taskPrioBigBox${currentTask[0][1]['id']}`).src = './assets/img/add_task/prio_urgent.svg';
        }
    };
}

function setTaskCategoryBigTask(task) {
    let taskCategory = task[0][1]['category'];
    let taskCategoryContainer = document.getElementById(`task-category-big${task[0][1]['id']}`);
    if (taskCategory == 'User Story') {
        taskCategoryContainer.style.backgroundColor = '#0038FF';
    } else {
        taskCategoryContainer.style.backgroundColor = '#1FD7C1';
    };
}

function getAllSubtasksBigTask(currentTask) {
    let subtasksSection = document.getElementById(`subtasks${currentTask[0][1]['id']}`);
    let subtaskHeadline = document.getElementById(`subtaks-headline${currentTask[0][1]['id']}`);
    let taskAllSubtasks = currentTask[0][1]['subtask'];
    let currentTaskId = currentTask[0][1]['id'];
    if (typeof taskAllSubtasks === "undefined") {} else {
        subtaskHeadline.innerHTML = generateSubtasksHeadline();
        for (let i = 0; i < taskAllSubtasks.length; i++) {
            const subtask = taskAllSubtasks[i];
            subtasksSection.innerHTML += generateSubtasksSectionBigTask(subtask, i, currentTaskId);
            setSubtaskStatus(subtask, i);
        };
    };
}

function setSubtaskStatus(subtask, i){
    let subtaskStatus = subtask['isDone'];
    let subtaskClass = document.getElementById(`subtask-checkbox${i}`)
    if(subtaskStatus == true){
        subtaskClass.classList.add('subtask-checkbox-checked');
    } else {
        subtaskClass.classList.remove('subtask-checkbox-checked');
    };
}

async function checkUncheckBox(i, currentTaskId) {
    let subtaskContainer = document.getElementById(`subtask-checkbox${i}`);
    if (allTasks[currentTaskId][1]['subtask'][i]['isDone'] == false) {
        subtaskContainer.classList.add('subtask-checkbox-checked');
        await editData(`tasks/${allTasks[currentTaskId][0]}/subtask/${i}`, {isDone: true});
        renderSubtask();
    } else {
        if (allTasks[currentTaskId][1]['subtask'][i]['isDone'] == true) {
            subtaskContainer.classList.remove('subtask-checkbox-checked')
            await editData(`tasks/${allTasks[currentTaskId][0]}/subtask/${i}`, {isDone: false});
            renderSubtask();
        }
    }
}

async function renderSubtask(){
    allTasks = Object.entries(await loadData('tasks'));
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        task[1]['id'] = i;
    }
}

function closeDialogTask() {
    document.querySelector('.background-big-task').classList.add('d-none');
    document.querySelector('.task-box-big').classList.remove('show-task-box-big');
    subtaskIdCounter = 0;
    loadTasks();
}

function animationDialogTask() {
    document.querySelector('.background-big-task').classList.toggle('d-none');
    setTimeout(function() {
        document.querySelector('.task-box-big').classList.toggle('show-task-box-big');
    }, 100)
}

async function loadTasks() {
    allTasks = Object.entries(await loadData('tasks'));
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        task[1]['id'] = i;
    }
    updateTasksHTML(allTasks);
}

function updateTasksHTML(tasks) {
    updateOpenTasks(tasks);
    updateInProgressTasks(tasks);
    updateAwaitFeedbackTasks(tasks);
    updateDoneTasks(tasks);
    document.querySelector(':root').style.setProperty('--height', 'fit-content');
}

/**
 * This function fetches the JSON array with the tasks and return it to the function updateTasksHTML()
 * 
 * @returns tasks - This is the JSON Array, which is returned to function updateTasksHTML()
 */
async function getTasksJson() {
    let response = await fetch('./js/addTasks.json');
    tasks = await response.json();
    return tasks;
}

/**
 * This function renders the tasks with the status “open”
 * 
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateOpenTasks(tasks) {
    open = tasks.filter(t => t[1]['status'] == 'open');
    let boardOpenTasks = document.getElementById('openTasks');
    if (boardOpenTasks) {
        if (open.length > 0) {
            boardOpenTasks.innerHTML = '';
            for (let i = 0; i < open.length; i++) {
                const openTask = open[i][1];
                boardOpenTasks.innerHTML += generateSmallTaskBox(openTask);
                getAllMembers(openTask);
                setPriority(openTask);
                setTaskCategory(openTask);
                getAllSubtasks(openTask);
                truncateText(openTask);
            };
        } else {
            let noTaskSentence = 'No tasks To do'
            boardOpenTasks.innerHTML = '';
            boardOpenTasks.innerHTML = generateNoTaskBox(noTaskSentence);
        };
    }
}

/**
 * This function renders the tasks with the status "in Progress"
 * 
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateInProgressTasks(tasks) {
    inProgress = tasks.filter(t => t[1]['status'] == 'in progress');
    let boardInProgressTasks = document.getElementById('inProgressTasks');
/*     boardInProgressTasks.innerHTML = ''; */
    if(boardInProgressTasks) {
        if (inProgress.length > 0) {
            boardInProgressTasks.innerHTML = '';
            for (let i = 0; i < inProgress.length; i++) {
                const inProgressTask = inProgress[i][1];
                boardInProgressTasks.innerHTML += generateSmallTaskBox(inProgressTask);
                getAllMembers(inProgressTask);
                setPriority(inProgressTask);
                setTaskCategory(inProgressTask);
                getAllSubtasks(inProgressTask);
                truncateText(inProgressTask);
            };
        } else {
            let noTaskSentence = 'No tasks in progress'
            boardInProgressTasks.innerHTML = '';
            boardInProgressTasks.innerHTML = generateNoTaskBox(noTaskSentence);
        };
    }
}

/**
 * This function renders the tasks with the status "await Feedback"
 * 
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateAwaitFeedbackTasks(tasks) {
    awaitFeedback = tasks.filter(t => t[1]['status'] == 'await feedback');
    let boardAwaitFeedbackTasks = document.getElementById('awaitFeedbackTasks');
    /*     boardAwaitFeedbackTasks.innerHTML = ''; */
    if (boardAwaitFeedbackTasks) {
        if (awaitFeedback.length > 0) {
            boardAwaitFeedbackTasks.innerHTML = '';
            for (let i = 0; i < awaitFeedback.length; i++) {
                const awaitFeedbackTask = awaitFeedback[i][1];
                boardAwaitFeedbackTasks.innerHTML += generateSmallTaskBox(awaitFeedbackTask);
                getAllMembers(awaitFeedbackTask);
                setPriority(awaitFeedbackTask);
                setTaskCategory(awaitFeedbackTask);
                getAllSubtasks(awaitFeedbackTask);
                truncateText(awaitFeedbackTask);
            };
        } else {
            let noTaskSentence = 'No tasks await feedback'
            boardAwaitFeedbackTasks.innerHTML = '';
            boardAwaitFeedbackTasks.innerHTML = generateNoTaskBox(noTaskSentence);
        };
    }
}

/**
 * This function renders the tasks with the status "done"
 * 
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateDoneTasks(tasks) {
    done = tasks.filter(t => t[1]['status'] == 'done');
    let boardDoneTasks = document.getElementById('doneTasks');
    /*     boardDoneTasks.innerHTML = ''; */
    if (boardDoneTasks) {
        if (done.length > 0) {
            boardDoneTasks.innerHTML = '';
            for (let i = 0; i < done.length; i++) {
                const doneTask = done[i][1];
                boardDoneTasks.innerHTML += generateSmallTaskBox(doneTask);
                getAllMembers(doneTask);
                setPriority(doneTask);
                setTaskCategory(doneTask);
                getAllSubtasks(doneTask);
                truncateText(doneTask);
            };
        } else {
            let noTaskSentence = 'No tasks Done'
            boardDoneTasks.innerHTML = '';
            boardDoneTasks.innerHTML = generateNoTaskBox(noTaskSentence);
        };
    }
}

/**
 * This function renders the members of each task
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function getAllMembers(task) {
    for (let j = 0; j < task['assigned member'].length; j++) {
        const member = task['assigned member'][j]['letters'];
        let taskId = task['id'];
        let memberId = taskId + member;
        document.getElementById(`task-all-member${task['id']}`).innerHTML += generateMemberTaskBox(member, memberId);
        setColorMember(task, j, memberId);
    };
}

/**
 * This function sets the background color for each member
 * 
 * @param {string} task - This is the JSON array with all tasks
 * @param {number} j - This is the index of the member
 * @param {string} memberId - This is the id of the member consisting of the task ID and the letters of the member (e.g. 0AM)
 */
function setColorMember(task, j, memberId) {
    let colorMember = task['assigned member'][j]['color'];
    let memberContainer = document.getElementById(memberId);
    memberContainer.style.backgroundColor = colorMember;
}

/**
 * This functions changes the img src depending of the task priority (low, middle, urgent)
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function setPriority(task) {
    let taskPrio = task['prio'];
    if (taskPrio == 'low') {
        document.getElementById(`taskPrio${task['id']}`).src = './assets/img/add_task/prio_low.svg';
    } else {
        if (taskPrio == 'medium') {
            document.getElementById(`taskPrio${task['id']}`).src = './assets/img/add_task/prio_medium.svg';
        } else {
            document.getElementById(`taskPrio${task['id']}`).src = './assets/img/add_task/prio_urgent.svg';
        }
    };
}

/**
 * This function changes the background color depending of the task category (User Story/Technical Task)
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function setTaskCategory(task) {
    let taskCategory = task['category'];
    let taskCategoryContainer = document.getElementById(`task-category${task['id']}`);
    if (taskCategory == 'User Story') {
        taskCategoryContainer.classList.add('user-story');
    } else {
        taskCategoryContainer.classList.add('technical-task');
    };
}

/**
 * This function checks if there are subtaks and includes the subtaks html-section to the div container
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function getAllSubtasks(task) {
    let subtasks = task['subtask'];
    if (typeof subtasks === "undefined") {} else {
        let subtasksSection = document.getElementById(`task${task['id']}`);
        subtasksSection.innerHTML += generateSubtasksSection();
        // calcSubtasksProgress(subtasks);
    };
}

function calcSubtasksProgress(subtasks){
    doneSubtasks = subtasks.filter(t => t['isDone'] == true);
    let numberSubtasks = subtasks.length;
    console.log(doneSubtasks);
    // let numberDoneSubtasks = doneSubtasks.length;
    // // let progress = numberSubtasks/numberDoneSubtasks;
    // // console.log(progress);
}

/**
 * This function cuts the description text after 50 characters and sets three dots (...)
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function truncateText(task) {
    var description = document.getElementById(`task-description${task['id']}`).innerHTML;
    var truncated = description.substring(0, 50) + "...";
    document.getElementById(`task-description${task['id']}`).innerHTML = truncated;
}

// edit Tasks

/**
 * This function initializes the subtask ID counter by finding the highest existing subtask ID n the specified task and setting the counter to this value plus one.
 * @param {number} index - The index of the task in the `allTasks` array.
 */
function initializeSubtaskIdCounter(index) {
    let maxId = 0;
    let subtasks = allTasks[index][1].subtask;

    for (let i = 0; i < subtasks.length; i++) {
        let subtaskIdNum = parseInt(subtasks[i].id);
        if (subtaskIdNum > maxId) {
            maxId = subtaskIdNum;
        }
    }
    subtaskIdCounter = maxId + 1; // Set counter to the highest value + 1
}

/**
 * This function edits a task by updating the task box with the edit form, rendering contacts and displaying the current task data.
 * @param {number} index - The index of the task to be edited in the `allTasks` array.
 * @param {event} event - The event object, used to update the priority button color.
 */
function editTask(index, event) {
    let bigTaskBox = document.getElementById('task-box-big');
    bigTaskBox.innerHTML = '';
    bigTaskBox.innerHTML += generateEditTaskBox(index);
    renderContactsInAddTasks();
    showSavedTasksData(index);
    let currentPrio = (allTasks[index][1].prio);
    addPrioButtonColor(currentPrio, event);
}

/**
 * This function displays saved task data in the edit form.
 * @param {number} index - The index of the task in the `allTasks` array.
 * @param {string} formattedDate - The formatted due date for the task.
 */
function showSavedTasksData(index) {
    document.querySelector('.title_tasks').value = `${allTasks[index][1].title}`;
    document.querySelector('.description_tasks').value = `${allTasks[index][1].description}`;
    document.querySelector('.dueDate_edit').innerHTML = generateInputDateHTML(index);
    renderExistingMembersEditTask(index);
    if (typeof allTasks[index][1].subtask !== 'undefined') {
        renderSubtasks(index);
    }
}

function saveNewDataTasks(index) {
    console.log(document.getElementById("title").value);
    console.log(document.getElementById("description").value);
    console.log(document.getElementById("date").value);
    console.log(selectedPrio);
    console.log(selectUsers);
    console.log(selectUsersColor);
    console.log(selectUsersLetters);
    console.log(memberIdCounter);
}

/**
 * This function renders the existing members for editing a task, including their profile pictures.
 * @param {number} index - The index of the task in the allTasks array. 
 */
function renderExistingMembersEditTask(index) {
    let existingMembersContainer = document.querySelector('#selectedMembers');
    existingMembersContainer.innerHTML = '';
    let existingMembers = allTasks[index][1]['assigned member'];

    selectUsers = [];
    selectUsersColor = [];
    selectUsersLetters = [];

    for (let i = 0; i < existingMembers.length; i++) {
        const member = existingMembers[i];
        console.log(member);
        selectUsers.push(member.name);
        selectUsersLetters.push(member.letters);
        selectUsersColor.push(member.color);
        existingMembersContainer.innerHTML += `<div id="${member.id}" class="profilbild">${member.letters}</div>`;
        document.getElementById(`${member.id}`).style.backgroundColor = `${member.color}`;
    }
}

/**
 * This function renders the existing subtasks for editing a task.
 * @param {number} index - The index of the task in the allTasks array.
 */
function renderSubtasks(index) {
    initializeSubtaskIdCounter(index);
    let subtaskAreaEdit = document.querySelector('#subtaskArea');
    let existingSubTasks = allTasks[index][1].subtask;

    for (let i = 0; i < existingSubTasks.length; i++) {
        const subTask = existingSubTasks[i];
        subtaskAreaEdit.innerHTML += generateSubtaskInnerHTML(`subtask_${subTask.id}`, subTask.description);
    }
}


async function addSearchTask() {
    let search = document.getElementById('searchField').value.toLowerCase();


    let filertasks = allTasks.filter(tasks => tasks.allTasks[i][1].description.includes(search));
    console.log(filertasks)
    emptyTasks();
    document.getElementById('inProgressTasks').innerHTML = '';
    document.getElementById('awaitFeedbackTasks').innerHTML = '';
    document.getElementById('doneTasks').innerHTML = '';


}

async function loadFilterTasks(filertasks) {
    filertasks = Object.entries(await loadData('tasks'));
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        task[1]['id'] = i;
    }
    updateTasksHTML(allTasks);
}

function emptyTasks() {
    let boardOpenTasks = document.getElementById('openTasks');
    let noTaskSentence = 'No tasks To do'
    boardOpenTasks.innerHTML = '';
    boardOpenTasks.innerHTML = generateNoTaskBox(noTaskSentence);
}

/**
 * This function deletes a task the specified index from the 'allTasks' array.
 * Finally it reloads the task, and closes the task dialog.
 * @param {Event} event - The event object associated with the delete action.
 * @param {number} index - The index of the task to be deleted in the 'allTasks' array.
 */
async function deleteTask(event, index) {
    await deleteData(`tasks/${allTasks[index][0]}`); 
    await loadTasks();
    closeDialogTask();
}