let selectUsers = [];
let selectUsersColor = [];

function addPrioButtonColor(prio, event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Buttons

  let buttonUrgent = document.getElementById("buttonUrgent");
  let buttonMedium = document.getElementById("buttonMedium");
  let buttonLow = document.getElementById("buttonLow");

  let buttonUrgentMobil = document.getElementById("buttonUrgentMobil");
  let buttonMediumMobil = document.getElementById("buttonMediumMobil");
  let buttonLowMobil = document.getElementById("buttonLowMobil");

  let imgUrgent = document.getElementById("buttonImg1");
  let imgMedium = document.getElementById("buttonImg2");
  let imgLow = document.getElementById("buttonImg3");

  let imgUrgentMobil = document.getElementById("buttonImg1Mobil");
  let imgMediumMobil = document.getElementById("buttonImg2Mobil");
  let imgLowMobil = document.getElementById("buttonImg3Mobil");

  removeClasses(
    buttonUrgent,
    buttonMedium,
    buttonLow,
    imgUrgent,
    imgMedium,
    imgLow,
    buttonUrgentMobil,
    buttonMediumMobil,
    buttonLowMobil,
    imgUrgentMobil,
    imgMediumMobil,
    imgLowMobil
  );

  if (prio === "urgent") {
    buttonUrgent.classList.add("backgroundColorRed", "fontWeightAndColor");
    imgUrgent.classList.add("imgColor");
    buttonUrgentMobil.classList.add("backgroundColorRed", "fontWeightAndColor");
    imgUrgentMobil.classList.add("imgColor");
  }
  if (prio === "medium") {
    buttonMedium.classList.add("backgroundColorOrange", "fontWeightAndColor");
    imgMedium.classList.add("imgColor");
    buttonMediumMobil.classList.add(
      "backgroundColorOrange",
      "fontWeightAndColor"
    );
    imgMediumMobil.classList.add("imgColor");
  }
  if (prio === "low") {
    buttonLow.classList.add("backgroundColorGreen", "fontWeightAndColor");
    imgLow.classList.add("imgColor");
    buttonLowMobil.classList.add("backgroundColorGreen", "fontWeightAndColor");
    imgLowMobil.classList.add("imgColor");
  }
}

function initAddTasks() {
  includeHTML();
  renderContactsInAddTasks();
}

function removeClasses(
  buttonUrgent,
  buttonMedium,
  buttonLow,
  imgUrgent,
  imgMedium,
  imgLow,
  buttonUrgentMobil,
  buttonMediumMobil,
  buttonLowMobil,
  imgUrgentMobil,
  imgMediumMobil,
  imgLowMobil
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
    buttonUrgentMobil,
    buttonMediumMobil,
    buttonLowMobil,
    imgUrgentMobil,
    imgMediumMobil,
    imgLowMobil,
  ];

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    for (let j = 0; j < classesToRemove.length; j++) {
      let className = classesToRemove[j];
      element.classList.remove(className);
    }
  }
}

function reloadPage() {
  location.reload();
}

async function renderContactsInAddTasks() {
  let response = await fetch("./js/contacts.json");
  let contacts = await response.json();
  let assignedTo = document.getElementById("assignedTo");
  let assignedToMobil = document.getElementById("assignedToMobil");

  assignedTo.innerHTML =
    "<option disabled selected>select contacts to assign</option>";
  assignedToMobil.innerHTML =
    "<option disabled selected>select contacts to assign</option>";

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let name = contact.name;
    let letters = contact.letters;
    assignedTo.innerHTML += `<option onchange="pushMembers(${JSON.stringify(
      contact
    )})" value="${letters}">${name}</option>`;

    assignedToMobil.innerHTML += `<option onchange="pushMembers(${JSON.stringify(
      contact
    )})" value="${letters}">${name}</option>`;
  }

  assignedTo.onchange = function () {
    let selectedName = assignedTo.value;
    let selectedContact = contacts.find(
      (contact) => contact.letters === selectedName
    );
    pushMembers(selectedContact);
  };
}

function pushMembers(contact) {
  let name = contact.letters;
  let color = contact.color;
  let fullName = contact.name;

  // Überprüfe, ob das Element bereits in selectUsers enthalten ist
  if (selectUsers.includes(name)) {
    // Wenn das Element bereits vorhanden ist, zeige eine Meldung an und beende die Funktion
    alert(`${fullName} wurde bereits eingeteilt.`);
    return;
  }

  // Füge das Element und seine Farbe zu selectUsers und selectUsersColor hinzu
  selectUsers.push(name);
  selectUsersColor.push(color);

  // Aktualisiere die Anzeige der ausgewählten Mitglieder
  renderPushedMembers();
}

function renderPushedMembers() {
  selectMembersArea = document.getElementById("selectedMembers");
  selectMembersArea.innerHTML = "";
  selectMembersAreaMobil = document.getElementById("selectedMembersMobil");
  selectMembersAreaMobil.innerHTML = "";

  for (let i = 0; i < selectUsers.length; i++) {
    const element = selectUsers[i];
    const color = selectUsersColor[i];
    selectMembersArea.innerHTML += `<div id="${element}" class="profilbild">${element}</div>`;
    selectMembersAreaMobil.innerHTML += `<div id="${element}2" class="profilbild">${element}</div>`;
    document.getElementById(`${element}`).style.backgroundColor = `${color}`;
    document.getElementById(`${element}2`).style.backgroundColor = `${color}`;
  }
}

renderContactsInAddTasksMobile();

async function renderContactsInAddTasksMobile() {
  let response = await fetch("./js/contacts.json");
  let contacts = await response.json();
  let assignedToMobil = document.getElementById("assignedToMobil");

  assignedToMobil.innerHTML =
    "<option disabled selected>select contacts to assign</option>";

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let name = contact.name;
    let letters = contact.letters;
    assignedToMobil.innerHTML += `<option onchange="pushMembers(${JSON.stringify(
      contact
    )})" value="${letters}">${name}</option>`;
  }

  assignedToMobil.onchange = function () {
    let selectedName = assignedToMobil.value;
    let selectedContact = contacts.find(
      (contact) => contact.letters === selectedName
    );
    pushMembers(selectedContact);
  };
}

function renderAddTasksFormAsJson(tasks) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let assignedTo = selectUsers;
  let date = document.getElementById("date").value;
  let prio = "";
  let category = document.getElementById("category").value;
  let subtasks = document.getElementById("subtask").value;
  let task = tasks;

  saveTaskToJson(title, description, date, category, assignedTo, subtasks);

  console.log(title, description, assignedTo, date, category, subtasks);
  console.log(task);
} // abklären zwecks in JSON laden

async function renderAddTaskinJson() {
  let response = await fetch("./js/addTasks.json");
  let tasks = await response.json();

  renderAddTasksFormAsJson(tasks);
}

async function saveTaskToJson(
  title,
  description,
  date,
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
    prio: "",
    category: category,
    "assigned member": assignedTo,
    subtask: subtasks,
  };

  // Task zur Liste hinzufügen
  tasks.push(newTask);

  // JSON-Datei aktualisieren
  await fetch("./js/addTasks.json", {
    method: "PUT", // oder 'POST'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  });

  console.log("Task erfolgreich hinzugefügt.");
  console.log(tasks);
}

function addNewSubtask() {
  subtask = document.getElementById('subtask').value;
  subtaskArea = document.getElementById('subtaskArea');

  subtaskArea.innerHTML += `<p class="fontSubtask">- ${subtask}</p>`;
  console.log('Neue Aufgabe hinzugefügt!');
}