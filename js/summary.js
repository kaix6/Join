let open;
let inProgress;
let awaitFeedback;
let done;
let urgentDate = [];

async function initializeSummary() {
    await loadTasks();
    getTasksLength();
}

function getTasksLength() {
    let urgent = allTasks.filter(t => t[1]['prio'] == 'urgent');
    let upcomingDeadline = formateDateSummary(urgent);
    let numberUrgent = urgent.length
    let numberOpen = open.length;
    let numberInProgress = inProgress.length;
    let numberAwaitFeedback = awaitFeedback.length;
    let numberDone = done.length;
    let numberAllTasks = allTasks.length;
    let mainSummary = document.querySelector('.main_summary');
    mainSummary.innerHTML = '';
    mainSummary.innerHTML += generateSummaryInnerHTML(upcomingDeadline, numberUrgent, numberOpen, numberInProgress, numberAwaitFeedback, numberDone, numberAllTasks);
}


function formateDateSummary(array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        urgentDate.push(element[1]['due date']);
    }
    urgentDate = urgentDate.sort();
    let newUrgentDate = new Date(urgentDate[0]).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"}) 
    return newUrgentDate;
}