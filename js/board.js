let currentDraggedTask;
let allTasks;
let assignedArrayEdit = [];
let filteredTasks = [];

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
 * Loads tasks from the database and updates their IDs before updating the HTML.
 */
async function loadTasks() {
    allTasks = Object.entries(await loadData('tasks'));
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        task[1]['id'] = i;
    }
    categorizeTasks(allTasks);
    updateTasksHTML(allTasks);
}

/**
 * Updates the HTML display of tasks across different task statuses.
 * @param {Array} tasks - The array containing all tasks to be displayed.
 */
function updateTasksHTML(tasks) {
    updateTasksByStatus(tasks, 'open', 'openTasks', 'No tasks To do');
    updateTasksByStatus(tasks, 'in progress', 'inProgressTasks', 'No tasks in progress');
    updateTasksByStatus(tasks, 'await feedback', 'awaitFeedbackTasks', 'No tasks await feedback');
    updateTasksByStatus(tasks, 'done', 'doneTasks', 'No tasks done');
    resetHeight();
}

/**
 * This function updates the tasks displayed on the task board based on their status and filters the tasks by the specified status and renders them in the HTML element with the given ID.
 * @param {Array} tasks - An array of tasks, each represented as an array with an index and task data.
 * @param {string} status - The status used to filter tasks.
 * @param {string} elementId - The ID of the HTML element where the filtered tasks will be rendered.
 * @param {string} noTaskMessage - The message displayed when no tasks match the specified status.
 */
function updateTasksByStatus(tasks, status, elementId, noTaskMessage) {
    let filteredTasks = tasks.filter(t => t[1] && t[1]['status'] === status);
    let taskBoard = document.getElementById(elementId);

    if (taskBoard) {
        taskBoard.innerHTML = '';
        if (filteredTasks.length > 0) {
            for (let i = 0; i < filteredTasks.length; i++) {
                const taskData = filteredTasks[i][1];
                taskBoard.innerHTML += generateSmallTaskBox(taskData);
                getAllMembers(taskData);
                setPriority(taskData);
                setTaskCategory(taskData);
                getAllSubtasks(taskData);
                truncateText(taskData);
            }
        } else {
            taskBoard.innerHTML = generateNoTaskBox(noTaskMessage);
        }
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
 * This function edits a task by updating the task box with the edit form, rendering contacts and displaying the current task data.
 * @param {number} index - The index of the task to be edited in the `allTasks` array.
 * @param {event} event - The event object, used to update the priority button color.
 */
function editTask(index, event) {
    let bigTaskBox = document.getElementById('task-box-big');
    bigTaskBox.classList.add('edit-mode');
    bigTaskBox.innerHTML = generateEditTaskBox(index);
    renderContactsInAddTasks();
    showSavedTasksData(index);
    let taskData = allTasks[index][1];
    addPrioButtonColor(taskData.prio, event);
    addStatusButtonColor(taskData.status, event);
    resetHeight();
    getDivHeight();
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
    let newStatus = selectedStatus;
    await deleteData(`tasks/${allTasks[index][0]["assigned member"]}`);
    for (let i = 0; i < selectUsers.length; i++) {
        let memberArray = { name: selectUsers[i], color: selectUsersColor[i], letters: selectUsersLetters[i], id: i };
        assignedArrayEdit.push(memberArray);
    }
    await editData(`tasks/${allTasks[index][0]}`, { title: newTitle.value, description: newDescription.value, "due date": newDueDate.value, prio: newPrio, status: newStatus, "assigned member": assignedArrayEdit });
    await loadTasks();
    animationDialogTask();
    showDialogTask(index);
    assignedArrayEdit = [];
}

/**
 * Initiates the editing of a subtask and listens for input events to update the subtask
 * @param {string} subtaskId - The ID of the subtask element to be edited.
 * @param {number} iSubtask - The index of the subtask within its task.
 * @param {number} iTask - The index of the task containing the subtask.
 */
async function editSubtaskEdit(subtaskId, iSubtask, iTask) {
    editSubtask(subtaskId);
    setTimeout(() => {
        let editInput = document.querySelector(`#${subtaskId} .editInput`);
        if (editInput) {
            editInput.addEventListener("blur", async() => {
                let editedSubtask = editInput.value.trim();
                if (editedSubtask !== "") {
                    await updateSubtask(editedSubtask, iSubtask, iTask);
                }
            });
            editInput.addEventListener("keyup", async(event) => {
                if (event.key === 'Enter') {
                    let editedSubtask = editInput.value.trim();
                    if (editedSubtask !== "") {
                        await updateSubtask(editedSubtask, iSubtask, iTask);
                    }
                }
            });
        }
    }, 0);
}

/**
 * This function updates a specific subtask's description in a task.
 *
 * @param {string} editedSubtask - The edited subtask description.
 * @param {number} iSubtask - The index of the subtask within the task.
 * @param {number} iTask - The index of the task within the tasks array.
 */
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

/**
 * Deletes a contact from all tasks where it is assigned as a member.
 * @param {number} currentIndex - The index of the contact in the `contacts` array.
 * @param {Array} contacts - An array containing contact objects.
 */
async function deleteContactInTasks(currentIndex, contacts) {
    let contactName = contacts[currentIndex][1]['name'];
    allTasks = Object.entries(await loadData('tasks'));
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i][1]['assigned member'];
        if (typeof task !== 'undefined') {
            for (let j = 0; j < task.length; j++) {
            const member = task[j];
            if (member['name'] == contactName) {
                allTasks[i][1]['assigned member'].splice(j, 1);
                let member = allTasks[i][1]['assigned member'];
                await editData(`tasks/${allTasks[i][0]}`, { "assigned member": member });
                };
            };
        };
    };
}

/**
 * Filters tasks based on the search query and updates the UI accordingly.
 */
 function addSearchTask() {
    filteredTasks = [];
    let search = document.getElementById('searchField').value.toLowerCase();
    let deleteButton = document.getElementById('delete-search');
    if (search === '') {
        loadTasks();
        deleteButton.classList.add('d-none');
        return;
    }
    for (let i = 0; i < allTasks.length; i++) {
        let tasks = allTasks[i];
        if (tasks[1]['description'].toLowerCase().includes(search) || tasks[1]['title'].toLowerCase().includes(search)) {
            filteredTasks.push(tasks);
        };
        deleteButton.classList.remove('d-none');
        updateTasksHTML(filteredTasks);
    };
    infoTaskFound(filteredTasks);
}

/**
 * This function deletes a task the specified index from the 'allTasks' array. Finally it reloads the task, and closes the task dialog.
 * @param {Event} event - The event object associated with the delete action.
 * @param {number} index - The index of the task to be deleted in the 'allTasks' array.
 */
async function deleteTask(event, index) {
    await deleteData(`tasks/${allTasks[index][0]}`);
    await loadTasks();
    closeDialogTask();
}