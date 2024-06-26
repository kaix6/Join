let selectUsers = [];
let selectUsersColor = [];
let selectUsersLetters = [];
let selectedPrio = "medium";
let assignedArray = [];
let memberIdCounter = 0;

let subtaskIdCounter = 0;
let subtaskArray = [];

let allTasksJson = [];

let subtaskStatus = localStorage.getItem('subtaskStatus') || '';

let selectedStatus = [];

/**
 * Sets the minimum selectable date in an input field with the id "date" to today's date.
 * This ensures that dates in the past are not selectable.
 */
function dateValidation() {
let today = new Date().toISOString().split('T')[0];
    document.getElementById("date").setAttribute('min', today);
}

/**
 * Adds an event listener to allow the creation of a new subtask when the Enter key is pressed
 * in an input field with the id "subtask". This prevents the default form submission behavior.
 */
function handleEnterKey(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      addNewSubtask();
  }
}

/**
 * Sets the default priority button to "low" by highlighting the corresponding button and image.
 * This function is used to apply the default styling for the "low" priority button on page load or reset.
 * @returns {void}
 */
function standardPrioButton() {
  let buttonMedium = document.getElementById("buttonMedium");
  let imgMedium = document.getElementById("buttonImg2");
  selectedButtonColor(buttonMedium, imgMedium, "backgroundColorOrange", "medium");
}

/**
 * Changes the highlighting color and appearance of the priority button based on the provided priority.
 * The function prevents the default behavior of the event, clears existing classes from the priority buttons and their images,
 * and then applies new classes to highlight the selected priority.
 * @param {string} prio - The priority of the button ("urgent", "medium", or "low").
 * @param {Event} event - The event object that triggered the call.
 * @returns {void}
 */
function addPrioButtonColor(prio, event) {
  event.preventDefault();
  let buttonUrgent = document.getElementById("buttonUrgent");
  let buttonMedium = document.getElementById("buttonMedium");
  let buttonLow = document.getElementById("buttonLow");
  let imgUrgent = document.getElementById("buttonImg1");
  let imgMedium = document.getElementById("buttonImg2");
  let imgLow = document.getElementById("buttonImg3");
  removeClasses(buttonUrgent, buttonMedium, buttonLow, imgUrgent, imgMedium, imgLow);
  if (prio === "urgent") {
    selectedButtonColor(buttonUrgent, imgUrgent, "backgroundColorRed", "urgent");
  } else if (prio === "medium") {
    selectedButtonColor(buttonMedium, imgMedium, "backgroundColorOrange", "medium");
  } else if (prio === "low") {
    selectedButtonColor(buttonLow, imgLow, "backgroundColorGreen", "low");
  }
}

/**
 * Applies the specified background color and appearance styles to a priority button and its associated image.
 * This function adds CSS classes to the button and image elements to change their appearance
 * according to the specified priority and updates the global `selectedPrio` variable.
 * @param {HTMLElement} button - The button element to be styled.
 * @param {HTMLElement} img - The image element associated with the button.
 * @param {string} backgroundColorClass - The CSS class for the background color to be applied to the button.
 * @param {string} prio - The priority value ("urgent", "medium", or "low") to be assigned.
 * @returns {void}
 */
function selectedButtonColor(button, img, backgroundColorClass, prio) {
  button.classList.add(backgroundColorClass, "fontWeightAndColor");
  img.classList.add("imgColor");
  selectedPrio = prio;
}

/**
 * Adds background color and text formatting classes to the button and sets the selected status.
 * 
 * @param {HTMLElement} button - The button element to which the classes will be added.
 * @param {string} backgroundColorClass - The name of the CSS class that sets the background color.
 * @param {string} status - The status that will be selected and set.
 */
function selectedStatusColor(button, backgroundColorClass, statusTask) {
  button.classList.add(backgroundColorClass, "fontWeightAndColor");
  selectedStatus = statusTask;
}

/**
 * Initializes the process of adding tasks.
 * This function sets up the necessary components for the task addition process by including HTML content,
 * rendering the contacts in the add tasks section, and initializing the JSON data needed for adding tasks.
 * @returns {void}
 */
function initAddTasks() {
  renderContactsInAddTasks();
  initJSONaddTasks();
  standardPrioButton();
  localStorage.removeItem('subtaskStatus');
  dateValidation();
  abledButton();
}

/**
 * Initializes the process of removing items from tasks.
 * This function removes the stored subtask status from local storage.
 * @returns {void}
 */
function initRemoveItemTasks() {
  localStorage.removeItem('subtaskStatus');
}

/**
 * Removes the highlighting classes from priority buttons and their images.
 * This function clears specific CSS classes from the provided button and image elements to remove any previously applied
 * highlighting styles. The classes removed include those used for background colors, font weight, and image color.
 * @param {HTMLElement} buttonUrgent - The urgent priority button element.
 * @param {HTMLElement} buttonMedium - The medium priority button element.
 * @param {HTMLElement} buttonLow - The low priority button element.
 * @param {HTMLElement} imgUrgent - The image associated with the urgent priority button.
 * @param {HTMLElement} imgMedium - The image associated with the medium priority button.
 * @param {HTMLElement} imgLow - The image associated with the low priority button.
 * @returns {void}
 */
function removeClasses(buttonUrgent, buttonMedium, buttonLow, imgUrgent, imgMedium, imgLow) {
  const classesToRemove = ["backgroundColorRed", "fontWeightAndColor", "backgroundColorOrange", "backgroundColorGreen", "imgColor",];
  const elements = [buttonUrgent, buttonMedium, buttonLow, imgUrgent, imgMedium, imgLow];
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      for (let j = 0; j < classesToRemove.length; j++) {
        let className = classesToRemove[j];
        element.classList.remove(className);
    }
  }
}

/**
 * Removes specified classes from the given buttons.
 * 
 * @param {HTMLElement} buttonToDo - The button element representing the "To Do" status.
 * @param {HTMLElement} buttonProgress - The button element representing the "In Progress" status.
 * @param {HTMLElement} buttonFeedback - The button element representing the "Feedback" status.
 * @param {HTMLElement} buttonDone - The button element representing the "Done" status.
 */
function removeClassesStatus(buttonToDo, buttonProgress, buttonFeedback, buttonDone) {
  const classesToRemove = ["backgroundColorBlue", "fontWeightAndColor",];
  const elements = [buttonToDo, buttonProgress, buttonFeedback, buttonDone];
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      for (let j = 0; j < classesToRemove.length; j++) {
        let className = classesToRemove[j];
        element.classList.remove(className);
    }
  }
}

/**
 * Reloads the page to clear the content.
 * @returns {void}
 */
function reloadPage() {
  location.reload();
}

/**
 * Renders contacts into the "Assigned To" field.
 * Loads contacts, populates the "Assigned To" dropdown, and sets up an event listener.
 * @returns {Promise<void>}
 */
async function renderContactsInAddTasks() {
  const contacts = Object.entries(await loadData("contacts"));
  const assignedTo = document.getElementById("assignedTo");
  const MembersArea = document.getElementById("selectedMembers");
  assignedTo.innerHTML = generateAssignedToFirst();
    contacts.forEach((contact) => {
      const { name, letters } = contact[1];
      if (!selectUsers.includes(name)) {
      assignedTo.innerHTML += `<option value="${name}">${name}</option>`;
      }
  });
  assignedTo.onchange = () =>
    handleAssignedToChange(contacts, assignedTo, MembersArea);
}

/**
 * Handles the change event for the "Assigned To" selection.
 * Updates the selected members area based on the selected contact and adds the selected contact to the members list.
 * @param {Array} contacts - The list of contacts.
 * @param {HTMLSelectElement} assignedTo - The "Assigned To" dropdown element.
 * @param {HTMLElement} MembersArea - The area where selected members are displayed.
 * @returns {void}
 */
function handleAssignedToChange(contacts, assignedTo, MembersArea) {
  const selectedName = assignedTo.value;
  const selectedContact = contacts.find(
    (contact) => contact[1].name === selectedName
  );
  if (selectedContact) {
    pushMembers(selectedContact[1]);
    MembersArea.classList.remove("selectedMembersNone");
    renderContactsInAddTasks();
  } else {
    console.error(`Contact with letters '${selectedName}' not found.`);
  }
}

/**
 * Adds the selected user to the "Assigned To" list and displays their profile image.
 * Checks if the user is already selected, shows an appropriate message,
 * and if not, adds the user's details to the selected users list and updates the display.
 * @param {Object} contact - The contact object containing user details.
 * @param {string} contact.name - The name of the contact.
 * @param {string} contact.color - The color associated with the contact.
 * @param {string} contact.letters - The letters representing the contact.
 * @returns {void}
 */
function pushMembers(contact) {
  const { name, color, letters } = contact;
  const messageSelected = document.getElementById("isSelected");
    if (selectUsers.includes(name)) {
      messageMemberIsAdded(messageSelected);
      return;
  }
  messageIsSelected(messageSelected);
  selectUsers.push(name);
  selectUsersColor.push(color);
  selectUsersLetters.push(letters);
  renderPushedMembers();
}

/**
 * Displays a message indicating that a user has been selected.
 * Updates the visibility of the provided message element to indicate that a user has been successfully selected.
 * @param {HTMLElement} messageSelected - The message element to update.
 * @returns {void}
 */
function messageIsSelected(messageSelected) {
  messageSelected.classList.remove("unset-display");
  messageSelected.classList.add("none-display");
}

/**
 * Displays a message indicating that the member is already added.
 * Updates the visibility of the provided message element to indicate that the member is already added.
 * @param {HTMLElement} messageSelected - The message element to update.
 * @returns {void}
 */
function messageMemberIsAdded(messageSelected) {
  messageSelected.classList.add("unset-display");
  messageSelected.classList.remove("none-display");
}

/**
 * Renders the selected users below the "Assigned To" section.
 * Clears the existing content in the selected members area and then iterates over the selected users list to display their profile images.
 * @returns {void}
 */
function renderPushedMembers() {
  const selectMembersArea = document.getElementById("selectedMembers");
  selectMembersArea.innerHTML = "";

  for (let i = 0; i < selectUsers.length; i++) {
    const element = selectUsers[i];
    const color = selectUsersColor[i];
    const letters = selectUsersLetters[i];

    if (!document.getElementById(`${element}`)) {
      selectMembersArea.innerHTML += generatePushedMembers(element, color, letters);
      document.getElementById(`${element}`).style.backgroundColor = `${color}`;
    }
  }
}

/**
 * Deletes a selected member from the list of assigned members.
 * Removes the specified member from the arrays holding information about selected users and updates the display accordingly.
 * @param {string} element - The name of the member to be deleted.
 * @returns {void}
 */
function deleteSelectMember(element) {
  const index = selectUsers.indexOf(element);
  if (index > -1) {
    selectUsers.splice(index, 1);
    selectUsersColor.splice(index, 1);
    selectUsersLetters.splice(index, 1);
    renderPushedMembers();
    renderContactsInAddTasks();
  }
}

/**
 * Renders the task details into the addTasks.json file.
 * Creates a new task object with the provided details, adds it to the tasks data, and then logs a success message.
 * Finally, it displays the dialog for adding the task to the board.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The due date of the task.
 * @param {string} prio - The priority of the task ("urgent", "medium", or "low").
 * @param {string} category - The category of the task.
 * @param {string} assignedTo - The member assigned to the task.
 * @returns {void}
 */
async function saveTaskToJson(title, description, date, prio, category) {
  for (let i = 0; i < selectUsers.length; i++) {
    const assignedUsers = selectUsers[i];
    const color = selectUsersColor[i];
    const letters = selectUsersLetters[i];
    const id = memberIdCounter++;
    let memberArray = {name: assignedUsers, color: color, letters: letters, id: id};
    assignedArray.push(memberArray);
  }
  if (subtaskStatus.length === 0) {
    subtaskStatus = 'open';
  }
  localStorage.setItem('subtaskStatus', subtaskStatus);
  renderNewTask(title, description, date, prio, category);
  await postData("tasks", newTask);
  disabledButton();
  showAddToBoardDialog();
  showDialogAddTask();
  initRemoveItemTasks();
  openBoardPage();
}

/**
 * Creates a new task object with the provided details.
 * Creates a new task object using the provided title, description, due date, priority, category, assigned members, subtasks, and status.
 * The task object is then assigned to the global variable `newTask`.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The due date of the task.
 * @param {string} prio - The priority of the task ("urgent", "medium", or "low").
 * @param {string} category - The category of the task.
 * @returns {void}
 */
function renderNewTask(title, description, date, prio, category) {
        newTask = {
          title: title,
          description: description,
          "due date": date,
          prio: prio,
          category: category,
          "assigned member": assignedArray,
          subtask: subtaskArray,
          status: subtaskStatus,
          id: 1,
        };
}

/**
 * Adds the subtask status based on the provided status string.
 * Maps the provided status string to the corresponding subtask status and saves it to local storage.
 * @param {string} status - The status of the subtask ("todo", "in_progress", or "feedback").
 * @returns {void}
 */
function addSubtaskStatus(status) {
  if (status === 'todo') {
      subtaskStatus = 'open';
  } else if (status === 'in_progress') {
      subtaskStatus = 'in progress';
  } else if (status === 'feedback') {
      subtaskStatus = 'await feedback';
  } else {
      console.error('Unrecognized status:', status);
      return;
  }
  localStorage.setItem('subtaskStatus', subtaskStatus);
}

/**
 * Opens the board page after creating a task.
 * Redirects the user to the board.html page after a delay of 2000 milliseconds.
 * @returns {void}
 */
function openBoardPage() {
  setTimeout(function () {
    window.location.href = 'board.html';
  }, 1500);
}

/**
 * Displays the add to board dialog box.
 * Shows the dialog box for adding a task to the board and hides it after a delay of 1500 milliseconds.
 * @returns {void}
 */
function showAddToBoardDialog() {
  let dialogbox = document.getElementById("dialogboxTask");
  dialogbox.classList.remove("none-display");
  dialogbox.classList.remove("dialogboxAddedToBoardTransform");
  dialogbox.classList.add("show_dialog_addTask");
  setTimeout(function () {
    dialogbox.classList.remove("show_dialog_addTask");
    dialogbox.classList.add("none-display");
    dialogbox.classList.add("dialogboxAddedToBoardTransform");
  }, 1500);
}

/**
 * Adds a new subtask.
 * Retrieves the value of the subtask input field, validates it,
 * generates a unique ID for the new subtask, and then calls another function to generate
 * the HTML for the subtask and append it to the subtask area.
 * @returns {void}
 */
function addNewSubtask() {
  let subtaskValue = document.getElementById("subtask").value;
  let subtaskText = document.getElementById("textSubtask");
  let subtaskArea = document.getElementById("subtaskArea");
  let subtaskId = "subtask_" + subtaskIdCounter++;
    if (subtaskValue === "") {
      subtaskText.classList.add("unset-display");
      return;
  }
  generateSubtaskArea(subtaskText, subtaskArea, subtaskValue, subtaskId);
}

/**
 * Generates and displays a new subtask area.
 * Updates subtask text visibility, generates HTML for the new subtask,
 * appends it to the subtask area, updates area visibility, clears input field,
 * and adds subtask value to an array.
 * @param {HTMLElement} subtaskText - Element for displaying subtask-related messages.
 * @param {HTMLElement} subtaskArea - Area for displaying subtasks.
 * @param {string} subtaskValue - Value of the new subtask.
 * @param {string} subtaskId - Unique ID for the new subtask.
 * @returns {void}
 */
function generateSubtaskArea(subtaskText, subtaskArea, subtaskValue, subtaskId) {
  subtaskText.classList.remove("unset-display");
  subtaskArea.innerHTML += generateSubtaskInnerHTML(subtaskId, subtaskValue);
  subtaskArea.classList.remove("subtaskAreaNone");
  document.getElementById("subtask").value = "";
  let subtaskComplete = {description: subtaskValue, isDone: false}
  subtaskArray.push(subtaskComplete);
}

/**
 * Removes a subtask element.
 * Removes the subtask element with the specified ID from the DOM.
 * @param {string} subtaskId - The ID of the subtask element to remove.
 * @returns {void}
 */
function removeSubtask(subtaskId) {
  let subtaskToRemove = document.getElementById(subtaskId);
  if (subtaskToRemove) {
    subtaskToRemove.remove();
  } else {
    return;
  }
}

/**
 * Edits a specific subtask.
 * Retrieves the subtask element with the specified ID from the DOM,
 * creates an input field for editing, and sets up event listeners for editing and saving.
 * @param {string} subtaskId - The ID of the subtask element to edit.
 * @returns {void}
 */
function editSubtask(subtaskId) {
  let subtaskElement = document.getElementById(subtaskId);
  if (subtaskElement) {
    let subtaskTextElement = subtaskElement.querySelector(".fontSubtask");
    let subtaskText = subtaskTextElement.innerText;
    let editInput = document.createElement("input");
    renderEditInputField(subtaskText, subtaskTextElement, editInput);
    acceptEnter(editInput, subtaskTextElement);
    editInput.addEventListener("blur", function () {
      saveEditedSubtask(subtaskTextElement, editInput);
    });
  }
}

/**
 * Sets up event listener to confirm changes with Enter key.
 * Adds an event listener to the edit input field to detect when
 * the Enter key is pressed. If Enter is pressed and the input is not empty,
 * it updates the subtask text element with the edited value.
 * @param {HTMLInputElement} editInput - The input field for editing.
 * @param {HTMLElement} subtaskTextElement - The element displaying the subtask text.
 * @returns {void}
 */
function acceptEnter(editInput, subtaskTextElement) {
  editInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      let editedSubtask = editInput.value.trim();
      if (editedSubtask !== "") {
        subtaskTextElement.innerText = editedSubtask;
      }
    }
  });
}

/**
 * Renders an input field for editing a subtask.
 * Configures the provided input field for editing, sets its type to "text",
 * initializes its value with the current subtask text, adds a styling class,
 * replaces the subtask text element with the input field, and sets focus to it.
 * @param {string} subtaskText - The current text of the subtask.
 * @param {HTMLElement} subtaskTextElement - The element displaying the subtask text.
 * @param {HTMLInputElement} editInput - The input field for editing.
 * @returns {void}
 */
function renderEditInputField(subtaskText, subtaskTextElement, editInput) {
  editInput.type = "text";
  editInput.value = subtaskText;
  editInput.classList.add("editInput");
  subtaskTextElement.innerHTML = "";
  subtaskTextElement.appendChild(editInput);
  editInput.focus();
}

/**
 * Saves the edited changes to a subtask.
 * Retrieves the edited subtask value from the input field,
 * trims it, and updates the subtask text element if the value is not empty.
 * @param {HTMLElement} subtaskTextElement - The element displaying the subtask text.
 * @param {HTMLInputElement} editInput - The input field containing the edited subtask value.
 * @returns {void}
 */
function saveEditedSubtask(subtaskTextElement, editInput) {
  let editedSubtask = editInput.value.trim();
  if (editedSubtask !== "") {
    subtaskTextElement.innerText = editedSubtask;
  }
}

/**
 * Validates the form data and saves the task to JSON.
 * This function retrieves form data, checks for required fields,
 * prevents the default form submission behavior if required fields are missing,
 * and then saves the task to JSON data if the form is valid.
 * @returns {boolean} - Indicates whether the form is valid (false if validation fails).
 */
function validateForm() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = selectedPrio;
  let category = document.getElementById("category").value;
  let textNotCategory = document.getElementById('warnTextCategory');
  if (category === "Select task category" || category === "") {
    textNotCategory.classList.remove('none-display');
  }
  if (title === "" || date === "" || category === "Select task category" || category === "") {
    return false;
  }
  saveTaskToJson(title, description, date, prio, category);
  return false;
}

/**
 * Initializes the JSON data for adding tasks.
 * This function loads tasks data, converts it into an array of entries,
 * and then adds the entries to the global allTasksJson array.
 * @returns {Promise<void>}
 */
async function initJSONaddTasks() {
  let tasks = Object.entries(await loadData("tasks"));
  allTasksJson.push(tasks);
}

/**
 * Clears the input fields and selected members in the add task dialog.
 * Resets the input fields for title, description, date, category,
 * subtasks area, assigned to dropdown, and selected members area.
 * @returns {void}
 */
function clearDialogAddTask() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";
  document.getElementById("category").innerHTML = generateCategoryAfterClearDialogAddTask();
  document.getElementById("subtaskArea").innerHTML = "";
  document.getElementById("assignedTo").innerHTML = generateAssignedToFirst();
  document.getElementById("selectedMembers").innerHTML = "";
  addPrioButtonColor('medium', event);
  document.getElementById('warnTextCategory').classList.add('none-display');
  selectUsers = [];
  selectUsersColor = [];
  selectUsersLetters = [];
  renderContactsInAddTasks();
}

/**
 * Displays the add task dialog box.
 * Adds the "display" class to the dialog box element to make it visible
 * and removes it after a certain duration to hide the dialog box.
 * @returns {void}
 */    
function showDialogAddTask() {
  const dialog = document.getElementById('dialogboxTask');
  dialog.classList.add('display');
  setTimeout(() => {
  dialog.classList.remove('display');
  }, 3000);
}

/**
 * Disables the submit button by setting its disabled property to true.
 */
function disabledButton() {
  document.getElementById('submitButton').disabled = true;
}

/**
 * Enables the submit button by setting its disabled property to false.
 */
function abledButton() {
  document.getElementById('submitButton').disabled = false;
}

/**
 * Displays the member name in the hover area.
 * This function updates the hover area with the provided member name when the event is triggered.
 * @param {MouseEvent} event - The mouse event triggering the name display.
 * @param {string} id - The ID or name of the member to be displayed.
 * @returns {void}
 */
function addNameHoverMembers(event, id) {
  let hoverArea = document.getElementById('hoverNameMembers');
hoverArea.innerHTML = `${id}`
}

/**
 * Removes the member name from the hover area.
 * This function clears the hover area, removing any displayed member name.
 * @returns {void}
 */
function removeNameHoverMembers() {
    let hoverArea = document.getElementById('hoverNameMembers');
hoverArea.innerHTML = "";
}
