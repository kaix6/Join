let currentDraggedTask;
let allTasks;

async function showDialogTask(i){
    let bigTaskBox = document.getElementById('task-box-big');
    let currentTask = allTasks.filter(t => t['id'] == i);
    await animationDialogTask();
    bigTaskBox.innerHTML = '';
    bigTaskBox.innerHTML += generateBigTaskBox(currentTask)
    getAllMembersBigTask(currentTask);
    setPriorityBigTask(currentTask);
    setTaskCategory(currentTask[0]);
    getAllSubtasksBigTask(currentTask);
}

function getAllMembersBigTask(currentTask){
    let memberContainer = document.getElementById('container-member-big-task');
    let taskAllMembers = currentTask[0]['assigned member'];
    for (let i = 0; i < taskAllMembers.length; i++){
        const currentTaskMember = taskAllMembers[i];
        memberContainer.innerHTML += generateMemberBigTaskBox(currentTaskMember);
        setColorMemberBigTask(currentTaskMember);
    };
}

function setColorMemberBigTask(currentTaskMember){
    let colorMember = currentTaskMember['color'];
    let memberContainer = document.getElementById(`member-letter-cirlce${currentTaskMember['id']}`);
    memberContainer.style.backgroundColor = colorMember;
}

function setPriorityBigTask(currentTask){
    let taskPrio = currentTask[0]['prio'];
    if (taskPrio == 'low') {
        document.getElementById(`taskPrioBigBox${currentTask[0]['id']}`).src ='./assets/img/add_task/prio_low.svg';
    } else {
        if (taskPrio == 'medium') {
            document.getElementById(`taskPrioBigBox${currentTask[0]['id']}`).src ='./assets/img/add_task/prio_medium.svg';  
        } else {
            document.getElementById(`taskPrioBigBox${currentTask[0]['id']}`).src ='./assets/img/add_task/prio_urgent.svg';
        }
    };
}

function getAllSubtasksBigTask(currentTask){
        let subtasksSection = document.getElementById(`subtasks${currentTask[0]['id']}`);
        let subtaskHeadline = document.getElementById(`subtaks-headline${currentTask[0]['id']}`);
        let taskAllSubtasks = currentTask[0]['subtask'];
        if(taskAllSubtasks.length > 0){
            subtaskHeadline.innerHTML = generateSubtasksHeadline();
            for (let i = 0; i < taskAllSubtasks.length; i++) {
                const subtask = taskAllSubtasks[i];
                subtasksSection.innerHTML += generateSubtasksSectionBigTask(subtask);
            };
        };
    }

function checkUncheckBox(id){
    document.getElementById(`subtask-checkbox${id}`).classList.toggle('subtask-checkbox-checked');
}

function closeDialogTask(){
    document.querySelector('.background-big-task').classList.add('d-none');
    document.querySelector('.task-box-big').classList.remove('show-task-box-big');
}

function animationDialogTask(){
    document.querySelector('.background-big-task').classList.toggle('d-none');
    setTimeout(function() {
        document.querySelector('.task-box-big').classList.toggle('show-task-box-big');
    }, 100)
}

async function updateTasksHTML(){
    let tasks = await getTasksJson();
    updateOpenTasks(tasks);
    updateInProgressTasks(tasks);
    updateAwaitFeedbackTasks(tasks);
    updateDoneTasks(tasks);
    allTasks = tasks;
}

/**
 * This function fetches the JSON array with the tasks and return it to the function updateTasksHTML()
 * 
 * @returns tasks - This is the JSON Array, which is returned to function updateTasksHTML()
 */
async function getTasksJson(){
    let response = await fetch('./js/addTasks.json');
    tasks = await response.json();
    return tasks;
}

/**
 * This function renders the tasks with the status “open”
 * 
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateOpenTasks(tasks){
    let open = tasks.filter(t => t['status'] == 'open')
    let boardOpenTasks = document.getElementById('openTasks');

    if(open.length > 0){
        boardOpenTasks.innerHTML = '';
        for (let i = 0; i < open.length; i++) {
            const openTask = open[i];
            boardOpenTasks.innerHTML += generateSmallTaskBox(openTask);
            getAllMembers(openTask);
            setPriority(openTask);
            setTaskCategory(openTask);
            getAllSubtasks(openTask);
            truncateText(openTask);
        };
    } else {
        boardOpenTasks.innerHTML = '';
        boardOpenTasks.innerHTML = generateNoTaskBox;
    };
}

/**
 * This function renders the tasks with the status "in Progress"
 * 
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateInProgressTasks(tasks){
    let inProgress = tasks.filter(t => t['status'] == 'in progress');
    let boardInProgressTasks = document.getElementById('inProgressTasks');
    boardInProgressTasks.innerHTML = '';
    for (let i = 0; i < inProgress.length; i++) {
        const inProgressTask = inProgress[i];
        boardInProgressTasks.innerHTML += generateSmallTaskBox(inProgressTask);
        getAllMembers(inProgressTask);
        setPriority(inProgressTask);
        setTaskCategory(inProgressTask);
        getAllSubtasks(inProgressTask);
        truncateText(inProgressTask);
    };
}

/**
 * This function renders the tasks with the status "await Feedback"
 * 
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateAwaitFeedbackTasks(tasks){
    let awaitFeedback = tasks.filter(t => t['status'] == 'await feedback');
    let boardAwaitFeedbackTasks = document.getElementById('awaitFeedbackTasks');
    boardAwaitFeedbackTasks.innerHTML = '';
    for (let i = 0; i < awaitFeedback.length; i++) {
        const awaitFeedbackTask = awaitFeedback[i];
        boardAwaitFeedbackTasks.innerHTML += generateSmallTaskBox(awaitFeedbackTask);
        getAllMembers(awaitFeedbackTask);
        setPriority(awaitFeedbackTask);
        setTaskCategory(awaitFeedbackTask);
        getAllSubtasks(awaitFeedbackTask);
        truncateText(awaitFeedbackTask);
    };
}

/**
 * This function renders the tasks with the status "done"
 * 
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateDoneTasks(tasks){
    let done = tasks.filter(t => t['status'] == 'done');
    let boardDoneTasks = document.getElementById('doneTasks');
    boardDoneTasks.innerHTML = '';
    for (let i = 0; i < done.length; i++) {
        const doneTask = done[i];
        boardDoneTasks.innerHTML += generateSmallTaskBox(doneTask);
        getAllMembers(doneTask);
        setPriority(doneTask);
        setTaskCategory(doneTask);
        getAllSubtasks(doneTask);
        truncateText(doneTask);
    };
}

/**
 * This function renders the members of each task
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function getAllMembers(task){
    for (let j = 0; j < task['assigned member'].length; j++) {
        const member = task['assigned member'][j]['letters'];
        let taskId = task['id'];
        let memberId = taskId+member;
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
function setColorMember(task, j, memberId){
    let colorMember = task['assigned member'][j]['color'];
    let memberContainer = document.getElementById(memberId);
    memberContainer.style.backgroundColor = colorMember;
}

/**
 * This functions changes the img src depending of the task priority (low, middle, urgent)
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function setPriority(task){
    let taskPrio = task['prio'];
    if (taskPrio == 'low') {
        document.getElementById(`taskPrio${task['id']}`).src ='./assets/img/add_task/prio_low.svg';
    } else {
        if (taskPrio == 'medium') {
            document.getElementById(`taskPrio${task['id']}`).src ='./assets/img/add_task/prio_medium.svg';  
        } else {
            document.getElementById(`taskPrio${task['id']}`).src ='./assets/img/add_task/prio_urgent.svg';
        }
    };
}

/**
 * This function changes the background color depending of the task category (User Story/Technical Task)
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function setTaskCategory(task){
    let taskCategory = task['category'];
    let taskCategoryContainer = document.getElementById(`task-category${task['id']}`);
    if (taskCategory == 'User Story') {
        taskCategoryContainer.style.backgroundColor = '#0038FF';
    } else {
        taskCategoryContainer.style.backgroundColor = '#1FD7C1';
    };
}

/**
 * This function checks if there are subtaks and includes the subtaks html-section to the div container
 * 
 * @param {string} task - This is the JSON array with all tasks
 */
function getAllSubtasks(task){
    let subtasks = task['subtask']
    let subtasksSection = document.getElementById(`task${task['id']}`);
    if(subtasks.length > 0){
        subtasksSection.innerHTML += generateSubtasksSection();
    };
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
