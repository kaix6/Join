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
function updateTasksHTML(){
    let tasks = getTasksJson();
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
        };
    } else {
        boardOpenTasks.innerHTML = '';
        boardOpenTasks.innerHTML = noTasksBox();
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
    };
}

