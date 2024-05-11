// Board

function generateSmallTaskBox(task) {
  return `
    <div>
        <div id="task-box-small" class="task-box" onclick="showDialogTask(${task["id"]})">
            <div id="task${task["id"]}">
            <p id="task-category${task["id"]}" class="task-type">${task["category"]}</p>
            <p class="task-headline">${task["title"]}</p>
            <p id="task-description${task["id"]}" class="task-description">${task["description"]}</p>
            </div>
            <div class="member-prio-section">
                <div id="task-all-member${task["id"]}" class="task-all-member">
                </div>
                <img id="taskPrio${task["id"]}" src="/assets/img/add_task/prio_low.svg">
            </div>
        </div>
    </div>
    `;
}

function generateBigTaskBox(task) {
  return `
    <div class="d-flex-center-space-btw">
        <p id="task-category${task[0]["id"]}" class="task-type">${task[0]["category"]}</p>
        <div class="close-icon" onclick="closeDialogTask()">
            <img src="./assets/img/add_task/close.svg" />
        </div>
    </div>
    <h2>${task[0]["title"]}</h2>
    <p class="task-description-big">${task[0]["description"]}</p>
    <div>
        <div class="d-flex">
            <p class="width-30">Due date:</p>
            <p>${task[0]["due date"]}</p>
        </div>
        <div class="d-flex">
            <p class="width-30">Priority:</p>
            <p>${task[0]["prio"]}</p>
            <img id="taskPrioBigBox${task[0]["id"]}" class="prio-icon" src="./assets/img/add_task/prio_low.svg" />
        </div>
        <div>
            <p class="margin-top-16px">Assigned To:</p>
        <div id="container-member-big-task" class="container-member-big-task">
        </div>
        <div>
            <div id="subtaks-headline${task[0]["id"]}">
            </div>
        <div id="subtasks${task[0]["id"]}" class="container-subtasks">
        </div>
        </div>
        <div class="container-delete-edit">
            <div class="delete">
                <img
                class="delete-edit-icon"
                src="./assets/img/board/icon+delete_black.svg"
                />
            </div>
            <div class="edit">
                <img
                class="delete-edit-icon"
                src="./assets/img/board/icon+edit_black.svg"
                />
            </div>
        </div>
    </div>
    `;
}

function generateSubtasksHeadline() {
  return `
    <p class="margin-top-16px">Subtasks</p>
    `;
}

function generateSubtasksSectionBigTask(task) {
  return `
    <div class="subtasks">
        <div id="subtask-checkbox${task["id"]}" class="subtask-checkbox" onclick="checkUncheckBox(${task["id"]})"></div>
        <p>${task["description"]}</p>
    </div>
    `;
}

function generateSubtasksSection() {
  return `
    <div class="progress-section">
        <div class="progress">
            <div class="progress-bar" style="width: 50%;"></div>
        </div>
        <p class="amount-subtask">1/2 Subtasks</p>
    </div>
    `;
}

function generateMemberTaskBox(member, memberId) {
  return `
    <div id="${memberId}" class="member">
        ${member}
    </div>
    `;
}

function generateNoTaskBox() {
  return `
    <div class="no-task-div">
        <p>No tasks To do</p>
    </div>`;
}

function generateMemberBigTaskBox(member) {
  return `
    <div class="container-letters-name">
        <div id="member-letter-cirlce${member["id"]}" class="member-big-task">${member["letters"]}</div>
        <p>${member["name"]}</p>
    </div>
    `;
}

// Contacts

function generateContactsInnerHTML(contact, i) {
  return /* HTML */ ` <div class="letter_content">
    <div
      onclick="toggleContactView(${i})"
      id="contact${i}"
      class="contact pointer"
    >
      <!-- Vergabe einer ID für JavaScript, wenn in JS gerendert wird -->
      <div id="short_name${i}" class="short_name round_div">
        <p class="short_name_text">${contact.letters}</p>
      </div>
      <div class="name_data flex_dir_c">
        <p class="contact_fullName">${contact.name}</p>
        <p class="contact_mail">${contact.mail}</p>
      </div>
    </div>
  </div>`;
}

function generateLettersInnerHTML(i, letter) {
  return /* HTML */ ` <div id="letter_names${i}" class="letter_names">
      <p class="head_letters">${letter}</p>
    </div>
    <div class="horizontal_line_content">
      <div class="horizontal_line"></div>
    </div>`;
}

function generateFloatingContactInnerHTML(i) {
  return /* HTML */ ` <div
      onclick="showContactOptions(${i})"
      class="add_change_btn_mobile hide_desktop pointer"
    >
      <img
        class="add_person_more_icon"
        src="assets/img/contacts/more_vert.svg"
        alt="add person icon"
      />
    </div>
    <div class="head_floating_content">
      <div id="short_name_overview${i}" class="short_name_overview round_div">
        <p class="short_name_text_overview">${sortedContacts[i].letters}</p>
      </div>
      <div class="name_editable_content">
        <h3 class="name_overview">${sortedContacts[i].name}</h3>
        <div class="editable_content">
          <div onclick="editContact(event, ${i})" class="edit_content pointer">
            <img
              class="contact_edit_icon img_width24"
              src="assets/img/contacts/edit.svg"
              alt="edit icon"
            />
            <p>Edit</p>
          </div>
          <div onclick="deleteContact(${i})" class="delete_content pointer">
            <img
              class="contact_delete_icon img_width24"
              src="assets/img/contacts/delete.svg"
              alt="delete icon"
            />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
    <p class="text_information">Contact Information</p>
    <div class="contact_information">
      <div class="contact_overview_mail">
        <h4>Email</h4>
        <p class="overview_mail">${sortedContacts[i].mail}</p>
      </div>
      <div class="contact_overview_phone">
        <h4>Phone</h4>
        <p>${sortedContacts[i].phone}</p>
      </div>
    </div>`;
}

function generateContactOptionsInnerHTML(i) {
  return /*HTML*/ `
        <div onclick="editContact(event, ${i})" class="edit_content pointer">
            <img class="contact_edit_icon img_width24" src="assets/img/contacts/edit.svg" alt="edit icon">
            <p>Edit</p>
        </div>
        <div onclick="deleteContact(${i})" class="delete_content pointer">
            <img class="contact_delete_icon img_width24" src="assets/img/contacts/delete.svg" alt="delete icon">
            <p>Delete</p>
        </div> `;
}

function generateDialoEditInnerHTML(index) {
  return /* HTML */ `
        <div onclick="doNotClose(event)" class="dialog_edit_contact">
            <div onclick="closeDialog('.dialog_edit_contact', 'show_dialog_edit_contact', '.dialog_edit_contact_bg', 'd_none', 100)" class="wrapper_close_add_edit_contact round_div pointer">
                <img class="close_add_edit_contact pointer" src="./assets/img/general/close.svg" alt="close icon">
            </div>
        <div class="top_dialog_add_edit flex_dir_c">
            <div class="head_top_dialog_add_edit flex_dir_c">
                <img class="img_logo" src="./assets/img/general/logo.svg" alt="join logo">
                <h3 class="headline_add_edit_contact">Edit contact</h3>
                <div class="seperator_line_content_contact">
                </div>
            </div>
        </div>
        <div id="create_contact_short_name_edit${index}" class="create_contact_short_name_edit round_div">
            <p class="short_name_text_overview_edit">${sortedContacts[index].letters}</p>
        </div>
        <div class="bottom_dialog_add_edit">
            <form onsubmit="event.preventDefault(); saveNewData(${index})" class="create_contact_form">
                <label for="fullName_edit"></label>
                <input class="create_contact_input" minlength="2" type="text" id="fullName_edit" placeholder="Name" required>
                <label for="mail_edit"></label>
                <input class="create_contact_input" type="email" id="mail_edit" placeholder="Email" required>
                <label for="telNumber_edit"></label>
                <input class="create_contact_input" type="tel" id="telNumber_edit" placeholder="Phone" required>
                <div class="container_button">
                    <button class="cancel_create_contact_edit_btn contact_btn pointer">
                        <p class="text_cancel_create_contact_edit_btn">Delete</p>
                    </button>
                    <button class="create_contact_btn contact_btn pointer" type="submit">
                        <p class="text_create_contact_btn">Save</p>
                        <img class="img_checked_btn img_width24" src="./assets/img/contacts/check.svg" alt="checked icon">
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
    `;
}

// addTasks
function generateSubtaskInnerHTML(subtaskId, subtaskValue) {
  return /* HTML */ `
    <div id="${subtaskId}" class="subtaskGenerate">
      <p class="fontSubtask">- ${subtaskValue}</p>
      <div>
        <img
          onclick="editSubtask('${subtaskId}')"
          class="iconSubtask"
          src="assets/img/add_task/edit.svg"
        />
        |
        <img
          onclick="removeSubtask('${subtaskId}')"
          class="iconSubtask"
          src="assets/img/add_task/delete.svg"
        />
      </div>
    </div>
  `;
}

function generateAssignedToFirst() {
  return /* HTML */ `
    "<option disabled selected>select contacts to assign</option>"
  `;
}



