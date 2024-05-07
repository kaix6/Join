let selectUsers = [];
let selectUsersColor = [];
let selectedPrio;

// Funktion für einfärben der Prio-Buttons
function addPrioButtonColor(prio, event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Buttons

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
  );

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

// Funktion fürs initiieren
function initAddTasks() {
  includeHTML();
  renderContactsInAddTasks();
}
// Funktion für entfernen der Farbe für die Prio-Buttons
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

// Funktion für neu laden der Seite (zum Clearen)
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
  let fullName = contact.name;

  if (selectUsers.includes(name)) {
    // Überprüfe, ob das Element bereits in selectUsers enthalten ist
    alert(`${fullName} wurde bereits eingeteilt.`); // Wenn das Element bereits vorhanden ist, zeige eine Meldung an und beende die Funktion
    return;
  }
  // Füge das Element und seine Farbe zu selectUsers und selectUsersColor hinzu
  selectUsers.push(name);
  selectUsersColor.push(color);
  renderPushedMembers();
}

// Funktion zum rendern der ausgewählten Users unterhalb "Assigned To"
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

// Funktion zum rendern der Elemente für das addTasks.json
function renderAddTasksFormAsJson(tasks) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let assignedTo = selectUsers;
  let date = document.getElementById("date").value;
  let prio = selectedPrio;
  let category = document.getElementById("category").value;
  let subtasks = document.getElementById("subtask").value;
  let task = tasks;

  saveTaskToJson(
    title,
    description,
    date,
    prio,
    category,
    assignedTo,
    subtasks
  );

  console.log(title, description, assignedTo, date, prio, category, subtasks);
  console.log(task);
}

// Funktion zum rendern von addTasks.json
async function renderAddTaskinJson() {
  let response = await fetch("./js/addTasks.json");
  let tasks = await response.json();

  renderAddTasksFormAsJson(tasks);
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
  let response = await fetch("./js/addTasks.json");
  let tasks = await response.json();

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

  subtaskArea.innerHTML += `<p class="fontSubtask">- ${subtask}</p>`;
  console.log("Neue Aufgabe hinzugefügt!");
}

function validateForm() {
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value.trim();
  const category = document.getElementById("category").value.trim();
  console.log(title, date, category);

  if (title === "" || date === "" || category === "") {
    console.log("bitte noch ausfüllen");
  } else {
    console.log("passt");
    renderAddTaskinJson();
  }
}
