let selectUsers = [];
let selectUsersColor = [];
let selectedPrio;

let subtaskIdCounter = 0;
let subtaskArray = [];

let allTasksJson = [];

/**
 * Changes the highlighting color and appearance of the priority button based on the provided priority.
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
  removeClasses(
    buttonUrgent,
    buttonMedium,
    buttonLow,
    imgUrgent,
    imgMedium,
    imgLow
  ); // Remove existing classes to clear previous highlights
  if (prio === "urgent") {
    selectedButtonColor(
      buttonUrgent,
      imgUrgent,
      "backgroundColorRed",
      "urgent"
    );
  } else if (prio === "medium") {
    selectedButtonColor(
      buttonMedium,
      imgMedium,
      "backgroundColorOrange",
      "medium"
    );
  } else if (prio === "low") {
    selectedButtonColor(buttonLow, imgLow, "backgroundColorGreen", "low");
  }
}

function selectedButtonColor(button, img, backgroundColorClass, prio) {
  button.classList.add(backgroundColorClass, "fontWeightAndColor");
  img.classList.add("imgColor");
  selectedPrio = prio;
}

/**
 * Initializes the process of adding tasks.
 * @returns {void}
 */
function initAddTasks() {
  includeHTML();
  renderContactsInAddTasks();
  initJSONaddTasks();
}

/**
 * Removes the highlighting classes from priority buttons and their images.
 * @param {HTMLElement} buttonUrgent - The urgent priority button element.
 * @param {HTMLElement} buttonMedium - The medium priority button element.
 * @param {HTMLElement} buttonLow - The low priority button element.
 * @param {HTMLElement} imgUrgent - The image associated with the urgent priority button.
 * @param {HTMLElement} imgMedium - The image associated with the medium priority button.
 * @param {HTMLElement} imgLow - The image associated with the low priority button.
 * @returns {void}
 */
function removeClasses(
  buttonUrgent,
  buttonMedium,
  buttonLow,
  imgUrgent,
  imgMedium,
  imgLow
) {
  const classesToRemove = [
    "backgroundColorRed",
    "fontWeightAndColor",
    "backgroundColorOrange",
    "backgroundColorGreen",
    "imgColor",
  ];
  const elements = [
    buttonUrgent,
    buttonMedium,
    buttonLow,
    imgUrgent,
    imgMedium,
    imgLow,
  ];

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

// Funktion zum Rendern von Kontakten in das Feld "Assigned To"
async function renderContactsInAddTasks() {
  const contacts = Object.entries(await loadData("contacts"));
  const assignedTo = document.getElementById("assignedTo");
  const MembersArea = document.getElementById("selectedMembers");
  assignedTo.innerHTML = generateAssignedToFirst(); // Platzhalter

  contacts.forEach((contact) => {
    const { name, letters } = contact[1];
    assignedTo.innerHTML += `<option value="${letters}">${name}</option>`;
  });

  assignedTo.onchange = () =>
    handleAssignedToChange(contacts, assignedTo, MembersArea);
}

// Funktion zum Bearbeiten der Auswahländerung
function handleAssignedToChange(contacts, assignedTo, MembersArea) {
  const selectedName = assignedTo.value;
  const selectedContact = contacts.find(
    (contact) => contact[1].letters === selectedName
  );

  if (selectedContact) {
    pushMembers(selectedContact[1]);
    MembersArea.classList.remove("selectedMembersNone");
  } else {
    console.error(`Contact with letters '${selectedName}' not found.`);
  }
}

// Funktion zum Hinzufügen der ausgewählten Benutzer (Anzeigen von Profilbildern) unter "Assigned To"
function pushMembers(contact) {
  const { letters, color } = contact;
  const messageSelected = document.getElementById("isSelected");

  if (selectUsers.includes(letters)) {
    messageMemberIsAdded(messageSelected);
    return;
  }
  messageIsSelected(messageSelected);

  // Füge das Element und seine Farbe zu selectUsers und selectUsersColor hinzu
  selectUsers.push(letters);
  selectUsersColor.push(color);
  renderPushedMembers();
}

function messageIsSelected(messageSelected) {
  messageSelected.classList.remove("unset-display");
  messageSelected.classList.add("none-display");
}

function messageMemberIsAdded(messageSelected) {
  messageSelected.classList.add("unset-display");
  messageSelected.classList.remove("none-display");
}

// Renders the selected users below the "Assigned To" section
function renderPushedMembers() {
  const selectMembersArea = document.getElementById("selectedMembers");
  selectMembersArea.innerHTML = "";

  for (let i = 0; i < selectUsers.length; i++) {
    const element = selectUsers[i];
    const color = selectUsersColor[i];

    if (!document.getElementById(`${element}`)) {
    selectMembersArea.innerHTML += `<div id="${element}" class="profilbild">${element}</div>`;
    document.getElementById(`${element}`).style.backgroundColor = `${color}`;
    }
  }
}

// Funktion zum rendern in das addTasks.json
async function saveTaskToJson(
  title,
  description,
  date,
  prio,
  category,
  assignedTo
) {
  // Neuen Task erstellen
  let newTask = {
    title: title,
    description: description,
    "due date": date,
    prio: prio,
    category: category,
    "assigned member": assignedTo,
    subtask: subtaskArray,
    status: "open",
  };

  await postData("tasks", newTask);

  console.log("Task erfolgreich hinzugefügt.");
  showAddToBoardDialog();
}

function showAddToBoardDialog() {
  let dialogbox = document.getElementById('dialogboxTask');
  dialogbox.classList.remove('none-display'); 
  dialogbox.classList.add('show_dialog_addTask'); 
  setTimeout(function() {
    dialogbox.classList.remove('show_dialog_addTask');
    dialogbox.classList.add('none-display');
}, 1500)
}

// Funktion für hinzufügen neuer Subtasks
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

function generateSubtaskArea(
  subtaskText,
  subtaskArea,
  subtaskValue,
  subtaskId
) {
  subtaskText.classList.remove("unset-display");
  subtaskArea.innerHTML += generateSubtaskInnerHTML(subtaskId, subtaskValue);
  subtaskArea.classList.remove("subtaskAreaNone");
  document.getElementById("subtask").value = "";
  subtaskArray.push(subtaskValue);
}

function removeSubtask(subtaskId) {
  let subtaskToRemove = document.getElementById(subtaskId);
  if (subtaskToRemove) {
    subtaskToRemove.remove();
    console.log("subtask entfernt");
  } else {
    return;
  }
}

// Funktion zum Bearbeiten eines bestimmten Subtasks
function editSubtask(subtaskId) {
  let subtaskElement = document.getElementById(subtaskId);
  if (subtaskElement) {
    let subtaskTextElement = subtaskElement.querySelector(".fontSubtask");
    let subtaskText = subtaskTextElement.innerText;
    let editInput = document.createElement("input");
    renderEditInputField(subtaskText, subtaskTextElement, editInput); // Erzeuge ein Eingabefeld für die Bearbeitung
    acceptEnter(editInput, subtaskTextElement); // Funktion, um mit Enter zu bestätigen

    editInput.addEventListener("blur", function () {
      saveEditedSubtask(subtaskTextElement, editInput);
    });
  }
}

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

function renderEditInputField(subtaskText, subtaskTextElement, editInput) {
  editInput.type = "text";
  editInput.value = subtaskText; // Setze den aktuellen Text als Standardwert im Eingabefeld
  editInput.classList.add("editInput");
  // Ersetze den Text durch das Eingabefeld
  subtaskTextElement.innerHTML = ""; // Entferne den bestehenden Text
  subtaskTextElement.appendChild(editInput); // Füge das Eingabefeld hinzu

  editInput.focus(); // Fokus auf das Eingabefeld setzen
}

// Hilfsfunktion, um die bearbeiteten Subtask-Änderungen zu speichern
function saveEditedSubtask(subtaskTextElement, editInput) {
  let editedSubtask = editInput.value.trim();
  if (editedSubtask !== "") {
    subtaskTextElement.innerText = editedSubtask;
  }
}

function validateForm() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let assignedTo = selectUsers;
  let date = document.getElementById("date").value;
  let prio = selectedPrio;
  let category = document.getElementById("category").value;

  if (title === "" || date === "" || category === "") {
    return false; // Verhindert das Standardverhalten des Formulars
  }
  saveTaskToJson(title, description, date, prio, category, assignedTo);
  return false;
}

async function initJSONaddTasks() {
  let tasks = Object.entries(await loadData("tasks"));
  allTasksJson.push(tasks);
}
