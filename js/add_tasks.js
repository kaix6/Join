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
  }
  if (prio === "medium") {
    buttonMedium.classList.add("backgroundColorOrange", "fontWeightAndColor");
    imgMedium.classList.add("imgColor");
  }
  if (prio === "low") {
    buttonLow.classList.add("backgroundColorGreen", "fontWeightAndColor");
    imgLow.classList.add("imgColor");
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
  imgLow
) {
  buttonUrgent.classList.remove("backgroundColorRed", "fontWeightAndColor");
  buttonMedium.classList.remove("backgroundColorOrange", "fontWeightAndColor");
  buttonLow.classList.remove("backgroundColorGreen", "fontWeightAndColor");
  imgUrgent.classList.remove("imgColor");
  imgMedium.classList.remove("imgColor");
  imgLow.classList.remove("imgColor");
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
    assignedTo.innerHTML += `<option value="${name}">${name}</option>`;
    assignedToMobil.innerHTML += `<option value="${name}">${name}</option>`;
  }
}
