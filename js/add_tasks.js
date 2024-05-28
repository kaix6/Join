let selectUsers = [];
let selectUsersColor = [];
let selectUsersLetters = [];
let selectedPrio;
let assignedArray = [];
let memberIdCounter = 0;

let subtaskIdCounter = 0;
let subtaskArray = [];

let allTasksJson = [];

let subtaskStatus = JSON.parse(localStorage.getItem('subtaskStatus')) || [];

/**
 * Changes the highlighting color and appearance of the priority button based on the provided priority.
 * The function prevents the default behavior of the event, clears existing classes from the priority buttons and their images,
 * and then applies new classes to highlight the selected priority.
 * @param {string} prio - The priority of the button ("urgent", "medium", or "low").
 * @param {Event} event - The event object that triggered the call.
 * @returns {void}
 */
function addPrioButtonColor(prio, event) {
  event.preventDefault(); // Prevents the default behavior of the button
  let buttonUrgent = document.getElementById("buttonUrgent");
  let buttonMedium = document.getElementById("buttonMedium");
  let buttonLow = document.getElementById("buttonLow");
  let imgUrgent = document.getElementById("buttonImg1");
  let imgMedium = document.getElementById("buttonImg2");
  let imgLow = document.getElementById("buttonImg3");
  removeClasses(buttonUrgent, buttonMedium, buttonLow, imgUrgent, imgMedium, imgLow); // Remove existing classes to clear previous highlights
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
 * Initializes the process of adding tasks.
 * This function sets up the necessary components for the task addition process by including HTML content,
 * rendering the contacts in the add tasks section, and initializing the JSON data needed for adding tasks.
 * @returns {void}
 */
function initAddTasks() {
  includeHTML();
  renderContactsInAddTasks();
  initJSONaddTasks();
  localStorage.removeItem('subtaskStatus');
  console.log(subtaskStatus);
}

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
 * Reloads the page to clear the content.
 * @returns {void}
 */
function reloadPage() {
  location.reload();
}

/**
 * Renders contacts into the "Assigned To" field.
 * This function loads contacts, populates the "Assigned To" dropdown, and sets up an event listener
 * for changes in the dropdown.
 * @returns {Promise<void>}
 */
async function renderContactsInAddTasks() {
  const contacts = Object.entries(await loadData("contacts"));
  const assignedTo = document.getElementById("assignedTo");
  const MembersArea = document.getElementById("selectedMembers");
  assignedTo.innerHTML = generateAssignedToFirst(); // Platzhalter

  contacts.forEach((contact) => {
    const { name, letters } = contact[1];
    assignedTo.innerHTML += `<option value="${name}">${name}</option>`;
  });

  assignedTo.onchange = () =>
    handleAssignedToChange(contacts, assignedTo, MembersArea);
}

/**
 * Handles the change event for the "Assigned To" selection.
 * This function updates the selected members area based on the selected contact
 * and adds the selected contact to the members list.
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
  } else {
    console.error(`Contact with letters '${selectedName}' not found.`);
  }
}

/**
 * Adds the selected user to the "Assigned To" list and displays their profile image.
 * This function checks if the user is already selected, shows an appropriate message,
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
 * This function updates the visibility of the provided message element
 * to indicate that a user has been successfully selected.
 * @param {HTMLElement} messageSelected - The message element to update.
 * @returns {void}
 */
function messageIsSelected(messageSelected) {
  messageSelected.classList.remove("unset-display");
  messageSelected.classList.add("none-display");
}

function messageMemberIsAdded(messageSelected) {
  messageSelected.classList.add("unset-display");
  messageSelected.classList.remove("none-display");
}

/**
 * Renders the selected users below the "Assigned To" section.
 * This function clears the existing content in the selected members area
 * and then iterates over the selected users list to display their profile images.
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

// Funktion zum Löschen eines Mitglieds
function deleteSelectMember(element) {
  // Element-Index finden
  const index = selectUsers.indexOf(element);
  if (index > -1) {
    // Elemente aus den Arrays entfernen
    selectUsers.splice(index, 1);
    selectUsersColor.splice(index, 1);
    selectUsersLetters.splice(index, 1);

    // Mitglieder neu rendern
    renderPushedMembers();
  }
}

/**
 * Renders the task details into the addTasks.json file.
 * This function creates a new task object with the provided details,
 * adds it to the tasks data, and then logs a success message.
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
    let memberArray = {name: assignedUsers, color: color, letters: letters,id: id};
    assignedArray.push(memberArray);
  } if (subtaskStatus.length === 0) {
    subtaskStatus.push('open');
  }
  localStorage.setItem('subtaskStatus', JSON.stringify(subtaskStatus));
  renderNewTask(title, description, date, prio, category);
  await postData("tasks", newTask);
  showAddToBoardDialog();
  initRemoveItemTasks();
  openBoardPage();
}

function renderNewTask(title, description, date, prio, category) {
        // Neuen Task erstellen
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

function addSubtaskStatus(status) {
  if (status === 'todo') {
      subtaskStatus.push('open');
  } else if (status === 'in_progress') {
      subtaskStatus.push('in progress');
  } else if (status === 'feedback') {
      subtaskStatus.push('await feedback');
  } else {
      console.error('Unrecognized status:', status);
      return;
  }
  localStorage.setItem('subtaskStatus', JSON.stringify(subtaskStatus));
}

/**
 * open board after create a task
 * @function openBoardPage
 * @returns {void}
 */
function openBoardPage() {
  setTimeout(function () {
    window.location.href = 'board.html';
  }, 2000);
}

/**
 * Displays the add to board dialog box.
 * This function shows the dialog box for adding a task to the board
 * the "none-display" class after 1500 milliseconds.
 * @returns {void}
 */
function showAddToBoardDialog() {
  let dialogbox = document.getElementById("dialogboxTask");
  dialogbox.classList.remove("none-display");
  dialogbox.classList.add("show_dialog_addTask");
  setTimeout(function () {
    dialogbox.classList.remove("show_dialog_addTask");
    dialogbox.classList.add("none-display");
  }, 1500);
}

/**
 * Adds a new subtask.
 * This function retrieves the value of the subtask input field, validates it,
 * generates a unique ID for the new subtask, and then calls another function to generate
 * the HTML for the subtask and append it to the subtask area.
 * @returns {void}
 */
function addNewSubtask() {
  let subtaskValue = document.getElementById("subtask").value;
  let subtaskText = document.getElementById("textSubtask");
  let subtaskArea = document.getElementById("subtaskArea");
  let subtaskId = "subtask_" + subtaskIdCounter++; // Erzeugen einer individuellen ID für generierte Subtask

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
 * This function removes the subtask element with the specified ID from the DOM,
 * logging a success message if the element is found.
 * @param {string} subtaskId - The ID of the subtask element to remove.
 * @returns {void}
 */
function removeSubtask(subtaskId) {
  let subtaskToRemove = document.getElementById(subtaskId);
  if (subtaskToRemove) {
    subtaskToRemove.remove();
    console.log("subtask entfernt");
  } else {
    return;
  }
}

/**
 * Edits a specific subtask.
 * This function retrieves the subtask element with the specified ID from the DOM,
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

/*     editInput.value = subtaskText; */ // Set initial value of the input field to the subtask text
    renderEditInputField(subtaskText, subtaskTextElement, editInput); // Erzeuge ein Eingabefeld für die Bearbeitung
    acceptEnter(editInput, subtaskTextElement); // Funktion, um mit Enter zu bestätigen

    editInput.addEventListener("blur", function () {
      saveEditedSubtask(subtaskTextElement, editInput);
    });
  }
}

/**
 * Sets up event listener to confirm changes with Enter key.
 * This function adds an event listener to the edit input field to detect when
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
  editInput.value = subtaskText; // Set current text as default value
  editInput.classList.add("editInput");
   // Replace text with input field
  subtaskTextElement.innerHTML = ""; // Remove existing text
  subtaskTextElement.appendChild(editInput); // Append input field

  editInput.focus(); // Set focus to input field
}

/**
 * Saves the edited changes to a subtask.
 * This function retrieves the edited subtask value from the input field,
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

  if (title === "" || date === "" || category === "") {
    return false; // Prevents default form behavior
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

/* feature - hover name*/
function showTooltip(event, id) {
  let tooltip = document.getElementById('tooltip');
  tooltip.innerHTML = id;

  let targetElement = event.target;
  let targetRect = targetElement.getBoundingClientRect();

  // Positionierung über dem Element
  let left = targetRect.left + (targetRect.width / 2) - (tooltip.offsetWidth / 2);
  let top = targetRect.top - tooltip.offsetHeight - 30; // 10px Abstand zum Element

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
  tooltip.classList.add('show');
}

function hideTooltip() {
  let tooltip = document.getElementById('tooltip');
  tooltip.classList.remove('show');
}