let open;
let inProgress;
let awaitFeedback;
let done;
let urgentDate = [];


/**
 * This function initializes the summary by loading tasks and getting the tasks length.
 */
async function initializeSummary() {
    await loadTasks();
    getTasksLength();
}


/**
 * This function updates the main summary section with the current task counts and the upcoming deadline.
 * Filters tasks based on priority and status, formats the date for summary, and generates the inner HTML for the summary section.
 */
function getTasksLength() {
    let urgent = allTasks.filter(t => t[1]['prio'] == 'urgent' && t[1]['status'] !== 'done');
    let upcomingDeadline = formateDateSummary(urgent);
    let mainSummary = document.querySelector('.main_summary');
    mainSummary.innerHTML = '';
    mainSummary.innerHTML += generateSummaryInnerHTML(upcomingDeadline, urgent.length, open.length, inProgress.length, awaitFeedback.length, done.length, allTasks.length);
}


/**
 * This function formats the due date of the most urgent task in the given array.
 * Extracts the due dates from tasks, sorts them, and converts the earliest date to a localized string. If the date is invalid, an empty string is returned.
 * @param {Array} array - The array of task objects to be processed.
 * @returns {string} - The formatted date string of the earliest due date, or an empty string if invalid.
 */
function formateDateSummary(array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        urgentDate.push(element[1]['due date']);
    }
    urgentDate = urgentDate.sort();
    let newUrgentDate = new Date(urgentDate[0]).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});
    if(newUrgentDate == "Invalid Date") {
        return "";
    }
    return newUrgentDate;
}