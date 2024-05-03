let currentDraggedTask;

function showDialogTask(){
    document.querySelector('.background-big-task').classList.toggle('d-none');
    setTimeout(function() {
        document.querySelector('.task-box-big').classList.toggle('show-task-box-big');
    }, 100);
}

function closeDialogTask(){
    document.querySelector('.background-big-task').classList.add('d-none');
    document.querySelector('.task-box-big').classList.remove('show-task-box-big');
}

// um alle Daten zu laden
// function init(){ 
//     loadUsers
//     loadTasks
// }

// um Daten zu speichern - potenziell in der allgemeinen script.js?
// function setItem(){
// }

// um Daten zu laden - potenziell in der allgemeinen script.js?
// function getItem(){
// }

// Diese Funktion rendert alle Tasks je Spalte auf dem Board
async function updateTasksHTML(){
    let tasks = await getTasksJson();
    updateOpenTasks(tasks);
    updateInProgressTasks(tasks);
    updateAwaitFeedbackTasks(tasks);
    updateDoneTasks(tasks);
}

// Diese Funktion holt das JSON Array mit den Tasks und gibt es an die update-Funktionen weiter
async function getTasksJson(){
    let response = await fetch('./js/addTasks.json');
    tasks = await response.json();
    return tasks;
}

// Diese Funktion rendert die Tasks mit dem Status "open"
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
        };
    } else {
        boardOpenTasks.innerHTML = '';
        boardOpenTasks.innerHTML = generateNoTaskBox;
    };
}

// Diese Funktion rendert die Tasks mit dem Status "in Progress"
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
    };
}

// Diese Funktion rendert die Tasks mit dem Status "await Feedback"
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
    };
}

// Diese Funktion rendert die Tasks mit dem Status "done"
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
    };
}

// Diese Funktion rendert die Member je Task
function getAllMembers(task){
    for (let j = 0; j < task['assigned member'].length; j++) {
        const member = task['assigned member'][j]['letters'];
        let taskId = task['id'];
        let memberId = taskId+member;
        document.getElementById(`task-all-member${task['id']}`).innerHTML += generateMemberTaskBox(member, memberId);
        setColorMember(task, j, memberId);
    };
}

// Diese Funktion vergibt die passende Hintergrundfarbe je Member
function setColorMember(task, j, memberId){
    let colorMember = task['assigned member'][j]['color'];
    let memberContainer = document.getElementById(memberId);
    memberContainer.style.backgroundColor = colorMember;
}

// Diese Funktion ändert die img Src je nach Task Priorität, damit das entsprechende Icon angezeigt wird 
function setPriority(task){
    let taskPrio = task['prio'];
    if (taskPrio == 'low') {
        document.getElementById(`taskPrio${task['id']}`).src ='/assets/img/add_task/prio_low.svg';
    } else {
        if (taskPrio == 'medium') {
            document.getElementById(`taskPrio${task['id']}`).src ='/assets/img/add_task/prio_medium.svg';  
        } else {
            document.getElementById(`taskPrio${task['id']}`).src ='/assets/img/add_task/prio_urgent.svg';
        }
    };
}

// Diese Funktion ändert die Hintergrundfarbe je nach Task-Category (User Story oder Technical Task)
function setTaskCategory(task){
    let taskCategory = task['category'];
    let taskCategoryContainer = document.getElementById(`task-category${task['id']}`);
    if (taskCategory == 'User Story') {
        taskCategoryContainer.style.backgroundColor = '#0038FF';
    } else {
        taskCategoryContainer.style.backgroundColor = '#1FD7C1';
    };
}

function getAllSubtasks(task){
    let subtasks = task['subtask']
    let subtasksSection = document.getElementById(`subtasks${task['id']}`);
    if(subtasks.length > 0){
        subtasksSection.innerHTML += generateSubtasksSection();
    };
}
