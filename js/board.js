let currentDraggedTask;
let allTasks;
let assignedArrayEdit = [];

// * Drag & Drop Start * //

/**
 * Initiates the dragging process for a task.
 * @param {string} id - The unique identifier of the task to be dragged.
 */
function startDraggin(id) {
    currentDraggedTask = id;
}

/**
 * This function prevents the default handling of the event, enabling the drop functionality for the specified drag event.
 * @param {DragEvent} ev - The drag event that is being handled.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function updates the status of the currently dragged task to the specified new status.
 * @param {string} newStatus - The new status to assign to the currently dragged task.
 */
async function moveTo(newStatus) {
    allTasks[currentDraggedTask][1]['status'] = newStatus;
    await editData(`tasks/${allTasks[currentDraggedTask][0]}`, { status: newStatus });
    updateTasksHTML(allTasks);
}

/**
 * This function adds the highlight style to the element with the given ID.
 * @param {string} id - The ID of the element to be highlighted.
 */
function highlight(id) {
    document.getElementById(id).classList.add('board-column-highlight');
}

/**
 * This function removes the the highlight style from the element with the given ID.
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlightLeave(id) {
    document.getElementById(id).classList.remove('board-column-highlight');
}

/**
 * Removes the highlight from a specified element at the end of a drag operation.
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlightEnd(id) {
    document.getElementById(id).classList.remove('board-column-highlight');
}

// * Drag & Drop End * //

/**
 * Displays a detailed view of a specific task in a dialog box.
 * @param {number} i - The ID of the task to be displayed.
 * @returns {Promise<void>} A promise that resolves when the task details have been fully displayed.
 */
async function showDialogTask(i) {
    let bigTaskBox = document.getElementById('task-box-big');
    bigTaskBox.classList.remove('edit-mode');
    let currentTask = allTasks.filter(t => t[1]['id'] == i);
    animationDialogTask();
    bigTaskBox.innerHTML = '';
    bigTaskBox.innerHTML += generateBigTaskBox(currentTask);
    getAllMembersBigTask(currentTask);
    setPriorityBigTask(currentTask);
    setTaskCategoryBigTask(currentTask);
    getAllSubtasksBigTask(currentTask);
    getDivHeight(currentTask);
}

async function changeStatusTo(newStatus, index) {
    allTasks[index][1]['status'] = newStatus;
    await editData(`tasks/${allTasks[index][0]}`, { status: newStatus });
    loadTasks();
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
 * Retrieves and displays all members assigned to a given task in a detailed view.
 * @param {Array} currentTask - The current task for which members are to be displayed.
 */
function getAllMembersBigTask(currentTask) {
    if (typeof currentTask[0][1]['assigned member'] === "undefined") { document.getElementById('member-headline').innerHTML = '' } else {
        let memberContainer = document.getElementById('container-member-big-task');
        let taskAllMembers = currentTask[0][1]['assigned member'];
        for (let i = 0; i < taskAllMembers.length; i++) {
            const currentTaskMember = taskAllMembers[i];
            memberContainer.innerHTML += generateMemberBigTaskBox(currentTaskMember);
            setColorMemberBigTask(currentTaskMember);
        };
    }
}

/**
 * Sets the background color of a member circle in the detailed task view.
 * @param {Object} currentTaskMember - The member object for which the color is to be set.
 */
function setColorMemberBigTask(currentTaskMember) {
    let colorMember = currentTaskMember['color'];
    let memberContainer = document.getElementById(`member-letter-cirlce${currentTaskMember['id']}`);
    memberContainer.style.backgroundColor = colorMember;
}

/**
 * Sets the priority icon for a task in the detailed task view.
 * @param {Array} currentTask - The current task for which the priority icon is to be set.
 */
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

/**
 * Sets the category color for a task in the detailed task view.
 * @param {Array} task - The current task for which the category color is to be set.
 */
function setTaskCategoryBigTask(task) {
    let taskCategory = task[0][1]['category'];
    let taskCategoryContainer = document.getElementById(`task-category-big${task[0][1]['id']}`);
    if (taskCategory == 'User Story') {
        taskCategoryContainer.style.backgroundColor = '#0038FF';
    } else {
        taskCategoryContainer.style.backgroundColor = '#1FD7C1';
    };
}

/**
 * Retrieves and displays all subtasks associated with a given task in the detailed task view.
 * @param {Array} currentTask - The current task for which subtasks are to be displayed.
 */
function getAllSubtasksBigTask(currentTask) {
    let subtasksSection = document.getElementById(`subtasks${currentTask[0][1]['id']}`);
    let subtaskHeadline = document.getElementById(`subtaks-headline${currentTask[0][1]['id']}`);
    let taskAllSubtasks = currentTask[0][1]['subtask'];
    let currentTaskId = currentTask[0][1]['id'];
    if (typeof taskAllSubtasks !== "undefined") {
        subtaskHeadline.innerHTML = generateSubtasksHeadline();
        for (let i = 0; i < taskAllSubtasks.length; i++) {
            const subtask = taskAllSubtasks[i];
            subtasksSection.innerHTML += generateSubtasksSectionBigTask(subtask, i, currentTaskId);
            setSubtaskStatus(subtask, i);
        };
    };
}



/**
 * Sets the status of a subtask checkbox based on its completion status.
 * @param {Object} subtask - The subtask object containing information about the subtask.
 * @param {number} i - The index of the subtask in the list of subtasks.
 */
function setSubtaskStatus(subtask, i) {

    let subtaskStatus = subtask['isDone'];
    let subtaskClass = document.getElementById(`subtask-checkbox${i}`)
    if (subtaskStatus == true) {
        subtaskClass.classList.add('subtask-checkbox-checked');
    } else {
        subtaskClass.classList.remove('subtask-checkbox-checked');
    };
}

/**
 * Toggles the completion status of a subtask checkbox and updates it in the UI and database.
 * @param {number} i - The index of the subtask within the task's list of subtasks.
 * @param {number} currentTaskId - The ID of the current task containing the subtask.
 */
async function checkUncheckBox(i, currentTaskId) {
    let subtaskContainer = document.getElementById(`subtask-checkbox${i}`);
    if (allTasks[currentTaskId][1]['subtask'][i]['isDone'] == false) {
        subtaskContainer.classList.add('subtask-checkbox-checked');
        await editData(`tasks/${allTasks[currentTaskId][0]}/subtask/${i}`, { isDone: true });
        renderSubtask();
    } else {
        if (allTasks[currentTaskId][1]['subtask'][i]['isDone'] == true) {
            subtaskContainer.classList.remove('subtask-checkbox-checked')
            await editData(`tasks/${allTasks[currentTaskId][0]}/subtask/${i}`, { isDone: false });
            renderSubtask();
        }
    }
}

/**
 * Renders and updates subtasks for all tasks.
 */
async function renderSubtask() {
    allTasks = Object.entries(await loadData('tasks'));
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        task[1]['id'] = i;
    }
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
 * Loads tasks from the database and updates their IDs before updating the HTML.
 */
async function loadTasks() {
    allTasks = Object.entries(await loadData('tasks'));
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        task[1]['id'] = i;
    }
    updateTasksHTML(allTasks);
}

/**
 * Updates the HTML display of tasks across different task statuses.
 * @param {Array} tasks - The array containing all tasks to be displayed.
 */
function updateTasksHTML(tasks) {
    updateOpenTasks(tasks);
    updateInProgressTasks(tasks);
    updateAwaitFeedbackTasks(tasks);
    updateDoneTasks(tasks);
    resetHeight();
}

function resetHeight() {
    document.querySelector(':root').style.setProperty('--height', 'fit-content');
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
 * This function renders the tasks with the status “open”
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateOpenTasks(tasks) {
    open = tasks.filter(t => t[1] && t[1]['status'] == 'open');
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
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateInProgressTasks(tasks) {
    inProgress = tasks.filter(t => t[1] && t[1]['status'] == 'in progress');
    let boardInProgressTasks = document.getElementById('inProgressTasks');
    /*     boardInProgressTasks.innerHTML = ''; */
    if (boardInProgressTasks) {
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
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateAwaitFeedbackTasks(tasks) {
    awaitFeedback = tasks.filter(t => t[1] && t[1]['status'] == 'await feedback');
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
 * @param {string} tasks - This is the JSON array with all tasks
 */
function updateDoneTasks(tasks) {
    done = tasks.filter(t => t[1] && t[1]['status'] == 'done');
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
 * @param {string} task - This is the JSON array with all tasks
 */
function getAllMembers(task) {
    if (typeof task['assigned member'] !== "undefined") {
        for (let j = 0; j < task['assigned member'].length; j++) {
            const member = task['assigned member'][j]['letters'];
            let taskId = task['id'];
            let memberId = taskId + task['assigned member'][j]['name'];
            document.getElementById(`task-all-member${task['id']}`).innerHTML += generateMemberTaskBox(member, memberId);
            setColorMember(task, j, memberId);
        };
        if (task['assigned member'].length > 9) {
            let memberArray = task['assigned member'];
            truncateMember(memberArray, task);
        };
    };
}

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
 * This function sets the background color for each member
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
 * @param {string} task - This is the JSON array with all tasks
 */
function getAllSubtasks(task) {
    let subtasks = task['subtask'];
    if (typeof subtasks !== "undefined") {
        calcSubtasksProgress(subtasks, task);
    };
}


/**
 * Calculates and displays the progress of subtasks for a task.
 * @param {Array} subtasks - The array containing all subtasks for the task.
 * @param {Object} task - The task object for which subtask progress is calculated.
 */
function calcSubtasksProgress(subtasks, task) {
    let subtasksSection = document.getElementById(`task${task['id']}`);
    allDoneSubtasks = subtasks.filter(t => t['isDone'] == true);
    let numberSubtasks = subtasks.length;
    let numberDoneSubtasks = allDoneSubtasks.length;
    let progress = ((numberDoneSubtasks / numberSubtasks) * 100).toFixed(0);
    subtasksSection.innerHTML += generateSubtasksSection(numberSubtasks, numberDoneSubtasks, progress);
}

/**
 * This function cuts the description text after 50 characters and sets three dots (...)
 * @param {string} task - This is the JSON array with all tasks
 */
function truncateText(task) {
    var description = document.getElementById(`task-description${task['id']}`).innerHTML;
    var truncated = description.substring(0, 50) + "...";
    document.getElementById(`task-description${task['id']}`).innerHTML = truncated;
}

/**
 * This function edits a task by updating the task box with the edit form, rendering contacts and displaying the current task data.
 * @param {number} index - The index of the task to be edited in the `allTasks` array.
 * @param {event} event - The event object, used to update the priority button color.
 */
async function editTask(index, event) {
    let bigTaskBox = document.getElementById('task-box-big');
    bigTaskBox.classList.add('edit-mode');
    bigTaskBox.innerHTML = '';
    bigTaskBox.innerHTML += generateEditTaskBox(index);
    renderContactsInAddTasks();
    showSavedTasksData(index);
    let currentPrio = (allTasks[index][1].prio);
    addPrioButtonColor(currentPrio, event);
    let currentStatus = (allTasks[index][1].status);
    addStatusButtonColor(currentStatus, event);
    resetHeight();
    getDivHeight();
}

function addStatusButtonColor(status, event) {
    event.preventDefault(); // Prevents the default behavior of the button
    let buttonToDo = document.getElementById("buttonToDo");
    let buttonProgress = document.getElementById("buttonProgress");
    let buttonFeedback = document.getElementById("buttonFeedback");
    let buttonDone= document.getElementById("buttonDone");
    removeClassesStatus(buttonToDo, buttonProgress, buttonFeedback, buttonDone); // Remove existing classes to clear previous highlights
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
 * This function displays the saved task data in the edit form.
 * @param {number} index - The index of the task in the `allTasks` array.
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

/**
 * This function updates the task data at the specified index with new values from input fields and deletes and replaces the assigned members and subtasks for the task.
 * @param {number} index - The index of the task to be updated.
 */
async function saveNewDataTasks(index) {
    let newTitle = document.getElementById("title");
    let newDescription = document.getElementById("description");
    let newDueDate = document.getElementById("date");
    let newPrio = selectedPrio;
    await deleteData(`tasks/${allTasks[index][0]["assigned member"]}`);
    for (let i = 0; i < selectUsers.length; i++) {
        let memberArray = { name: selectUsers[i], color: selectUsersColor[i], letters: selectUsersLetters[i], id: i };
        assignedArrayEdit.push(memberArray);
    }
    await editData(`tasks/${allTasks[index][0]}`, { title: newTitle.value, description: newDescription.value, "due date": newDueDate.value, prio: newPrio, "assigned member": assignedArrayEdit });
    await loadTasks();
    animationDialogTask();
    showDialogTask(index);
    assignedArrayEdit = [];
}

async function editSubtaskEdit(subtaskId, iSubtask, iTask) {

    editSubtask(subtaskId);

    setTimeout(() => { // stellt sicher, dass das DOM aktualisiert wird, bevor das Event ausgeführt wird
        let editInput = document.querySelector(`#${subtaskId} .editInput`);
        if (editInput) {
            editInput.addEventListener("blur", async() => {
                let editedSubtask = editInput.value.trim();
                if (editedSubtask !== "") {
                    await updateSubtask(editedSubtask, iSubtask, iTask);
                }
            });

            editInput.addEventListener("keyup", async(event) => {
                if (event.key === "Enter") {
                    let editedSubtask = editInput.value.trim();
                    if (editedSubtask !== "") {
                        await updateSubtask(editedSubtask, iSubtask, iTask);
                    }
                }
            });
        }
    }, 0);
    /*   await loadTasks(); */
}

async function updateSubtask(editedSubtask, iSubtask, iTask) {
    let newEditedSubtask = editedSubtask.replace("- ", "");
    allTasks[iTask][1].subtask[iSubtask].description = newEditedSubtask;

    let updatedSubtasks = allTasks[iTask][1].subtask;

    await editData(`tasks/${allTasks[iTask][0]}`, { subtask: updatedSubtasks });
}

/**
 * This function deletes a subtask from a task and updates the task data in Firebase.
 * @param {string} subtaskId - The ID of the subtask element in the DOM.
 * @param {number} iSubtask - The index of the subtask in the task's subtask array.
 * @param {number} iTask - The index of the task in the `allTasks` array.
 */
async function deleteSubtaskEdit(subtaskId, iSubtask, iTask) {
    let taskData = allTasks[iTask][1];
    taskData.subtask.splice(iSubtask, 1);
    await editData(`tasks/${allTasks[iTask][0]}`, { subtask: taskData.subtask });
    removeSubtask(subtaskId);
    renderSubtasks(iTask);
/*     await loadTasks(); */
}

/**
 * This function adds a new subtask to an existing task and updates the task data in Firebase.
 * @param {number} index - The index of the task in the `allTasks` array.
 */
async function addNewSubtaskPush(index) {
    let newTask = document.getElementById("subtask").value;
    if (newTask === "") {
        document.getElementById("textSubtask").classList.add("unset-display");
        return;
    }
    let existingSubtasks = allTasks[index][1].subtask || [];
    let newSubtask = { description: newTask, isDone: false };
    existingSubtasks.push(newSubtask);
    await editData(`tasks/${allTasks[index][0]}`, { subtask: existingSubtasks });
    allTasks[index][1].subtask = existingSubtasks;
    addNewSubtask();
    renderSubtasks(index);
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

    if (typeof allTasks[index][1]['assigned member'] !== "undefined") {
        for (let i = 0; i < existingMembers.length; i++) {
            const member = existingMembers[i];
            selectUsers.push(member.name);
            selectUsersLetters.push(member.letters);
            selectUsersColor.push(member.color);
            existingMembersContainer.innerHTML += `<div onclick="deleteSelectMember('${member.name}', '${member.color}', '${member.letters}')" id="${member.id}" class="profilbild">${member.letters}</div>`;
            document.getElementById(`${member.id}`).style.backgroundColor = `${member.color}`;
        };
    };
}

/**
 * This function renders the existing subtasks for editing a task.
 * @param {number} index - The index of the task in the allTasks array.
 */
function renderSubtasks(index) {
    let subtaskAreaEdit = document.querySelector('#subtaskArea');
    let existingSubTasks = allTasks[index][1].subtask;
    subtaskAreaEdit.innerHTML = '';

    for (let i = 0; i < existingSubTasks.length; i++) {
        const subTask = existingSubTasks[i];
        subtaskAreaEdit.innerHTML += generateEditSubtaskInnerHTML(`subtask_${i}`, subTask.description, i, index);
    }
}

async function deleteContactInTasks(currentIndex, contacts) {
    let contactName = contacts[currentIndex][1]['name'];
    allTasks = Object.entries(await loadData('tasks'));
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i][1]['assigned member'];
        if (typeof task !== 'undefined') {
            for (let j = 0; j < task.length; j++) {
            const member = task[j];
            if (member['name'] == contactName) {
                await deleteData(`tasks/${allTasks[i][0]}/assigned member/${j}`);
                loadTasks();
                };
            };
        };
    };
}

let filteredTasks = [];

 function addSearchTask() {
    filteredTasks = [];
    let search = document.getElementById('searchField').value.toLowerCase();
    if (search === '') {
        loadTasks();
        return;
    }
    for (let i = 0; i < allTasks.length; i++) {
        let tasks = allTasks[i];
        if (tasks[1]['description'].toLowerCase().includes(search) || tasks[1]['title'].toLowerCase().includes(search)) {
            filteredTasks.push(tasks);
        }
        updateTasksHTML(filteredTasks);
    }
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