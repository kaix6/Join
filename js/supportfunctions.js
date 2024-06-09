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

/**
 * Adjusts the height of the task box to fit within the viewport.
 */
function getDivHeight() {
    let bigTaskBox = document.querySelector('.task-box-big');
    let viewportWithoutNavi = window.innerHeight - 83;
    let height = bigTaskBox.offsetHeight;
    let gapHeight = (viewportWithoutNavi - height);
    changeTaskBoxHeight(gapHeight, height);
}

/**
 * Adjusts the CSS variable for the task box height based on the available space.
 * @param {number} gapHeight - The gap between the available viewport height and the task box height.
 * @param {number} height - The current height of the task box.
 */
function changeTaskBoxHeight(gapHeight, height) {
    let r = document.querySelector(':root');
    let newHeight;
    if (gapHeight < -1) {
        newHeight = 'calc(100% - 80px - 83px)';
    } else {
        newHeight = height;
    }
    r.style.setProperty('--height', newHeight);
};

/**
 * This function resets the CSS custom property '--height' to 'fit-content'.
 */
function resetHeight() {
    document.querySelector(':root').style.setProperty('--height', 'fit-content');
}

/**
 * Closes the detailed task dialog box.
 */
function closeDialogTask() {
    document.querySelector('.background-big-task').classList.add('d-none');
    document.querySelector('.task-box-big').classList.remove('show-task-box-big');
    loadTasks();
}

/**
 * Animates the opening and closing of the detailed task dialog box.
 */
function animationDialogTask() {
    document.querySelector('.background-big-task').classList.toggle('d-none');
    setTimeout(function() {
        document.querySelector('.task-box-big').classList.toggle('show-task-box-big');
    }, 100)
}

/**
 * This function fetches the JSON array with the tasks and return it to the function updateTasksHTML()
 * @returns tasks - This is the JSON Array, which is returned to function updateTasksHTML()
 */
async function getTasksJson() {
    let response = await fetch('./js/addTasks.json');
    tasks = await response.json();
    return tasks;
}

/**
 * Truncates the member array to display only the first 7 members in the UI.
 * @function truncateMember
 * @param {Array} memberArray - An array containing member information.
 * @param {Object} task - The task object containing information about the task.
 */
function truncateMember(memberArray, task) {
    let memberContainer = document.getElementById(`task-all-member${task['id']}`);
    memberContainer.innerHTML = '';
    for (let i = 0; i < 7; i++) {
        let member = memberArray[i]['letters'];
        let taskId = task['id'];
        let memberId = taskId + task['assigned member'][i]['name'];
        memberContainer.innerHTML += generateMemberTaskBox(member, memberId);
        setColorMember(task, i, memberId);
    };
    let furtherMember = memberArray.length - 7;
    memberContainer.innerHTML += generateFurtherMemberNumber(furtherMember);
}

/**
 * This function cuts the description text after 50 characters and sets three dots (...)
 * @param {string} task - This is the JSON array with all tasks
 */
function truncateText(task) {
    let description = document.getElementById(`task-description${task['id']}`).innerHTML;
    let truncated = description.substring(0, 50) + "...";
    document.getElementById(`task-description${task['id']}`).innerHTML = truncated;
}

/**
 * Adds color highlighting to the status buttons based on the provided status.
 * @param {string} status - The status value to determine which button to highlight.
 * @param {Event} event - The event object associated with the action (e.g., button click).
 */
function addStatusButtonColor(status, event) {
    event.preventDefault();
    let buttonToDo = document.getElementById("buttonToDo");
    let buttonProgress = document.getElementById("buttonProgress");
    let buttonFeedback = document.getElementById("buttonFeedback");
    let buttonDone= document.getElementById("buttonDone");
    removeClassesStatus(buttonToDo, buttonProgress, buttonFeedback, buttonDone);
    if (status === "open") {
      selectedStatusColor(buttonToDo, "backgroundColorBlue", "open");
    } else if (status === "in progress") {
      selectedStatusColor(buttonProgress, "backgroundColorBlue", "in progress");
    } else if (status === "await feedback") {
      selectedStatusColor(buttonFeedback, "backgroundColorBlue", "await feedback");
    } else if (status === "done") {
    selectedStatusColor(buttonDone, "backgroundColorBlue", "done");
    }
  }

  /**
   * Adds an event listener to allow the creation of a new subtask when the Enter key is pressed
   * in an input field with the id "subtask". This prevents the default form submission behavior.
   */
  function handleEnterKeyPushNewTask(event, index) {
      if (event.keyCode === 13) {
          event.preventDefault(); 
          addNewSubtaskPush(index);
      }
    }

    /**
     * Displays or hides the "no search result" message based on the length of the filtered tasks.
     */
    function infoTaskFound(){
        let inputSearch = document.getElementById("no-search-result");
        if (filteredTasks.length == 0) {
            inputSearch.classList.remove('d-none');
        } else {
            inputSearch.classList.add('d-none');
        };
    }

    /**
     * Clears the search field, hides the delete button and the "no search result" message,
     * and reloads the tasks.
     */
    function deleteSearch() {
        let inputSearch = document.getElementById("no-search-result");
        let deleteButton = document.getElementById('delete-search');
        document.getElementById('searchField').value = '';
        deleteButton.classList.add('d-none');
        inputSearch.classList.add('d-none');
        loadTasks();
    }