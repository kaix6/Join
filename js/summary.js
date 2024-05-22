let open;
let inProgress;
let awaitFeedback;
let done;

async function initializeSummary() {
    await loadTasks();
    getTasksLength();
}

function getTasksLength() {
    let urgent = allTasks.filter(t => t[1]['prio'] == 'urgent');
    let numberUrgent = urgent.length
    console.log(urgent);
    let numberOpen = open.length;
    let numberInProgress = inProgress.length;
    let numberAwaitFeedback = awaitFeedback.length;
    let numberDone = done.length;
    let numberAllTasks = allTasks.length;
    let mainSummary = document.querySelector('.main_summary');
    mainSummary.innerHTML = '';
    mainSummary.innerHTML += generateSummaryInnerHTML(numberUrgent, numberOpen, numberInProgress, numberAwaitFeedback, numberDone, numberAllTasks);
}