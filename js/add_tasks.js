let selectUsers = [];
let selectUsersColor = [];
let selectedPrio;

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
  removeClasses(buttonUrgent, buttonMedium, buttonLow, imgUrgent, imgMedium, imgLow);  // Remove existing classes to clear previous highlights
  if (prio === "urgent") {
    buttonUrgent.classList.add("backgroundColorRed", "fontWeightAndColor");
    imgUrgent.classList.add("imgColor");
    selectedPrio = "urgent";
  } else if (prio === "medium") {
    buttonMedium.classList.add("backgroundColorOrange", "fontWeightAndColor");
    imgMedium.classList.add("imgColor");
    selectedPrio = "medium";
  } else if (prio === "low") {
    buttonLow.classList.add("backgroundColorGreen", "fontWeightAndColor");
    imgLow.classList.add("imgColor");
    selectedPrio = "low";
  }
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
function removeClasses(buttonUrgent, buttonMedium, buttonLow, imgUrgent, imgMedium, imgLow) {
  const classesToRemove = ["backgroundColorRed", "fontWeightAndColor", "backgroundColorOrange", "backgroundColorGreen", "imgColor"];
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

// Funktion zum rendern von Kontakten in das Feld "Assigned To"
async function renderContactsInAddTasks() {
  let response = await fetch("./js/contacts.json");
  let contacts = await response.json();
  let assignedTo = document.getElementById("assignedTo");

  assignedTo.innerHTML =
    "<option disabled selected>select contacts to assign</option>";

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let name = contact.name;
    let letters = contact.letters;
    assignedTo.innerHTML += `<option onchange="pushMembers(${JSON.stringify(
      contact
    )})" value="${letters}">${name}</option>`;
  }

  assignedTo.onchange = function () {
    let selectedName = assignedTo.value;
    let selectedContact = contacts.find(
      (contact) => contact.letters === selectedName
    );
    pushMembers(selectedContact);
    renderContactsInAddTasks();
  };
}

// Funktion zum hinzufügen der ausgewählten Users (anzeigen von Profilbildern) unter "Assigned To"
function pushMembers(contact) {
  let name = contact.letters;
  let color = contact.color;
  let messageSelected = document.getElementById('isSelected');
  messageSelected.classList.remove("unset-display") // Wenn das Element bereits vorhanden ist, zeige eine Meldung an und beende die Funktion
  messageSelected.classList.add("none-display")

  if (selectUsers.includes(name)) {
    // Überprüfe, ob das Element bereits in selectUsers enthalten ist
    messageSelected.classList.add("unset-display") // Wenn das Element bereits vorhanden ist, zeige eine Meldung an und beende die Funktion
    messageSelected.classList.remove("none-display") // Wenn das Element bereits vorhanden ist, zeige eine Meldung an und beende die Funktion
    return;
  }
  // Füge das Element und seine Farbe zu selectUsers und selectUsersColor hinzu
  selectUsers.push(name);
  selectUsersColor.push(color);
  renderPushedMembers();
}

/**
 * Renders the selected users below the "Assigned To" section.
 * @returns {void}
 */
function renderPushedMembers() {
  selectMembersArea = document.getElementById("selectedMembers");
  selectMembersArea.innerHTML = "";

  for (let i = 0; i < selectUsers.length; i++) {
    const element = selectUsers[i];
    const color = selectUsersColor[i];
    selectMembersArea.innerHTML += `<div id="${element}" class="profilbild">${element}</div>`;
    document.getElementById(`${element}`).style.backgroundColor = `${color}`;
  }
}

// Funktion zum rendern in das addTasks.json
async function saveTaskToJson(
  title,
  description,
  date,
  prio,
  category,
  assignedTo,
  subtasks
) {


  // Neuen Task erstellen
  let newTask = {
    title: title,
    description: description,
    "due date": date,
    prio: prio,
    category: category,
    "assigned member": assignedTo,
    subtask: subtasks,
  };

  tasks.push(newTask);

  // JSON-Datei aktualisieren
  await fetch("./js/addTasks.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  });

  console.log("Task erfolgreich hinzugefügt.");
  console.log(tasks);
}

// Funktion für hinzufügen neuer Subtasks
function addNewSubtask() {
  subtask = document.getElementById("subtask").value;
  subtaskArea = document.getElementById("subtaskArea");

  subtaskArea.innerHTML += ` 
  <div class=subtaskGenerate>
  <p class="fontSubtask">- ${subtask}</p>
  <div> <img class="iconSubtask" src="assets/img/add_task/edit.svg"/> | <img class="iconSubtask" src="assets/img/add_task/delete.svg"/> </div>
  </div>
  `
  console.log("Neue Aufgabe hinzugefügt!");
}

function validateForm() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let assignedTo = selectUsers;
  let date = document.getElementById("date").value;
  let prio = selectedPrio;
  let category = document.getElementById("category").value;
  let subtasks = document.getElementById("subtask").value;

  if (title === "" || date === "" || category === "") {
      return false; // Verhindert das Standardverhalten des Formulars
  }
  saveTaskToJson(title, description, date, prio, category, assignedTo, subtasks);
  return false;
}

async function initJSONaddTasks() {
  let response = await fetch('./js/addTasks.json');
  tasks = await response.json();
}
