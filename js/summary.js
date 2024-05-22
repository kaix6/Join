let open;
let inProgress;
let awaitFeedback;
let done;

async function initializeSummary() {
    await loadTasks();
    test();
}

function test() {
    let numberOpen = open.length;
    let numberInProgress = inProgress.length;
    let numberAwaitFeedback = awaitFeedback.length;
    let numberDone = done.length;
    let numberAllTasks = allTasks.length;
    let mainSummary = document.querySelector('.main_summary');
    mainSummary.innerHTML = '';
    mainSummary.innerHTML += generateSummaryInnerHTML(numberOpen, numberInProgress, numberAwaitFeedback, numberDone, numberAllTasks);
}