let open;
let inProgress;
let awaitFeedback;
let done;
let urgentDate = [];

/**
 * This function categorizes tasks based on their status.
 * @param {Array} tasks - An array of tasks, each represented as an array with an index and task data.
 */
function categorizeTasks(tasks) {
    open = tasks.filter(t => t[1] && t[1]['status'] === 'open');
    inProgress = tasks.filter(t => t[1] && t[1]['status'] === 'in progress');
    awaitFeedback = tasks.filter(t => t[1] && t[1]['status'] === 'await feedback');
    done = tasks.filter(t => t[1] && t[1]['status'] === 'done');
}

/**
 * This function initializes the summary by loading tasks and getting the tasks length.
 */
async function initializeSummary() {
    await loadTasks();
    getTasksLength();
    loadUser();
    showName();
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


/**
 * This function returns a greeting message based on the current time of day.
 * The greeting is determined by the hour of the day:
 * - 05:00 to 10:59: "Good Morning,"
 * - 11:00 to 14:59: "Good Day,"
 * - 15:00 to 17:59: "Good Afternoon,"
 * - 18:00 to 21:59: "Good Evening,"
 * - Otherwise: "Still awake or do you ever sleep?"
 *
 * @returns {string} A greeting message based on the current time of day.
 */
function showGreeting() {
    let today = new Date();
    let currentHour = today.getHours();
    if(currentHour >= 5 && currentHour <11) {
        return'Good Morning,';
    } else if (currentHour >= 11 && currentHour <15) {
        return 'Good Day,';  
    } else if (currentHour >= 15 && currentHour <18) {
        return 'Good Afternoon,';
    } else if (currentHour >= 18 && currentHour <22) {
        return 'Good Evening,';
    } else {
        return 'Still awake or do you ever sleep?';
    }
}


/**
 * This function updates the summary text with the user's name retrieved from the user's information.
 */
async function showName() {
    let userInfo = await getUserInfos();
    let currentGreeting = showGreeting();
    let summaryText = document.querySelector('.summaryText');
    let userLogStatus = localStorage.getItem('logStatus');
    summaryText.innerHTML = generateSummaryTextInnerHTML(userInfo.name, currentGreeting);
    if(userLogStatus === null){
        mobileGreeting();
        localStorage.setItem("logStatus", "loggedIn");
    } else {
        document.querySelector('.summaryText').classList.add('display-none');
    }
}

/**
 * Displays a mobile greeting message with a fade-out effect.
 * 
 * @function mobileGreeting
 * @returns {void}
 */
function mobileGreeting() {
    let summaryText = document.querySelector('.summaryText');
    setTimeout(() => {
        summaryText.classList.add('fade-out');
    }, 400);
    setTimeout(() => {
        document.querySelector('.summaryText').classList.add('display-none');
    }, 2000);
}