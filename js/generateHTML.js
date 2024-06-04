// Board

function generateSmallTaskBox(task) {
  return `
        <div id="task-box-small" class="task-box" onclick="showDialogTask(${task["id"]})" draggable="true" ondragstart="startDraggin(${task["id"]})">
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
    `;
}

function generateBigTaskBox(task) {
  return `
    <div class="d-flex-center-space-btw">
        <p id="task-category-big${task[0][1]["id"]}" class="task-type">${task[0][1]["category"]}</p>
        <div class="close-icon" onclick="closeDialogTask()">
            <img src="./assets/img/add_task/close.svg" />
        </div>
    </div>
    <h2>${task[0][1]["title"]}</h2>
    <p class="task-description-big">${task[0][1]["description"]}</p>
    <div>
        <div class="d-flex">
            <p class="width-30">Due date:</p>
            <p>${convertDate(task[0][1]["due date"])}</p>
        </div>
        <div class="d-flex">
            <p class="width-30">Priority:</p>
            <p>${task[0][1]["prio"]}</p>
            <img id="taskPrioBigBox${task[0][1]["id"]}" class="prio-icon" src="./assets/img/add_task/prio_low.svg" />
        </div>
        <div>
            <div id ="member-headline" class="margin-top-16px">Assigned To:</div>
            <div id="container-member-big-task" class="container-member-big-task">
            </div>
        <div>
            <div id="subtaks-headline${task[0][1]["id"]}">
            </div>
            <div id="subtasks${task[0][1]["id"]}" class="container-subtasks">
            </div>
        </div>
        <div class="container-delete-edit">
          <div class="delete" onclick="deleteTask(event, ${task[0][1]["id"]})" >
            <img
              class="contact_delete_icon img_width16"
              src="assets/img/contacts/delete.svg"
              alt="delete icon"
            />
            <p>Delete</p>
          </div>
          <div class="border-left">
            <div class="edit" onclick="editTask(${task[0][1]["id"]}, event)">
              <img
                class="contact_edit_icon img_width16"
                src="assets/img/contacts/edit.svg"
                alt="edit icon"
              />
              <p>Edit</p>
            </div>
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

function generateSubtasksSectionBigTask(subtask, i, taskId) {
  return `
    <div class="subtasks">
        <div id="subtask-checkbox${i}" class="subtask-checkbox" onclick="checkUncheckBox(${i},${taskId})"></div>
        <p>${subtask["description"]}</p>
    </div>
    `;
}

function generateSubtasksSection(allSubtasks, doneSubtasks, progress) {
  return `
    <div class="progress-section">
        <div class="progress">
            <div class="progress-bar" style="width: ${progress}%;"></div>
        </div>
        <p class="amount-subtask">${doneSubtasks}/${allSubtasks} Subtasks</p>
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

function generateFurtherMemberNumber(furtherMember){
  return`
    <div class="further-member">
    +${furtherMember}
    </div>
    `;
}


function generateNoTaskBox(sentence){
    return `
    <div class="no-task-div">
        <p>${sentence}</p>
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

function generateEditTaskBox(index) {
  return /* HTML */ `
            <section class="edit_box_big mainEditTasks dialogMainTasks">

              <div onclick="closeDialogTask()" class="wrapper_close_edit_task round_div pointer">
                    <img class="close_edit_tasks" src="./assets/img/general/close.svg" alt="close icon">
                </div>
                <form onsubmit="event.preventDefault(); saveNewDataTasks(${index})">
                <div class="scroll_EditTasks">
                  <div class="test">
                    <label class="fontUnderHeadlinesAddTasks" for="title">Title</label>
                    <input type="text" id="title" class="focus_editTask title_tasks" name="title" placeholder="Enter a title" required/>
                    <div style="margin-top: 24px">
                      <label class="fontUnderHeadlinesAddTasks" for="description">Description</label>
                      <textarea id="description" class="focus_editTask_description description_tasks" name="description" rows="4" cols="50" placeholder="Enter a Description"></textarea>
                    </div>

                  <div class="dueDate_edit" style="margin-top: 24px">
                    
                    </div>

                    <div class="prio_edit fontUnderHeadlinesAddTasks">
                      <p class="prio_edit_text">Priority</p>
                      <div class="prio_edit_buttons">
                        <button id="buttonUrgent" onclick="addPrioButtonColor('urgent', event)" class="buttonPrio buttonPrio_edit">
                          Urgent
                          <img id="buttonImg1" src="assets/img/add_task/prio_urgent.svg" alt=""/>
                        </button>
                        <button id="buttonMedium" onclick="addPrioButtonColor('medium', event)" class="buttonPrio buttonPrio_edit">
                          Medium
                          <img id="buttonImg2" src="assets/img/add_task/prio_medium.svg" alt=""/>
                        </button>
                        <button id="buttonLow" onclick="addPrioButtonColor('low', event)" class="buttonPrio buttonPrio_edit">
                          Low
                          <img id="buttonImg3" src="assets/img/add_task/prio_low.svg" alt=""/>
                        </button>
                      </div>
                    </div>

                    <div style="margin-top: 24px">
                      <label class="fontUnderHeadlinesAddTasks" for="assigned">Assigned to</label>
                      <select onclick="renderContactsInAddTasks()" name="assigned" id="assignedTo"></select>
                    </div>

                    <div id="selectedMembers"></div>
                    <div class="none-display" id="isSelected">
                      Has already been selected
                    </div>
                    <div class="status_edit fontUnderHeadlinesAddTasks">
                      <p class="fontUnderHeadlinesAddTasks">Status</p>
                      <div class="status_edit_buttons">
                        <button id="buttonToDo" onclick="addStatusButtonColor('open', event)" class="buttonPrio buttonPrio_edit">
                          To Do
                        </button>
                        <button id="buttonProgress" onclick="addStatusButtonColor('in progress', event)" class="buttonPrio buttonPrio_edit">
                          In Progress
                        </button>
                        <button id="buttonFeedback" onclick="addStatusButtonColor('await feedback', event)" class="buttonPrio buttonPrio_edit">
                          Await Feedback
                        </button>
                        <button id="buttonDone" onclick="addStatusButtonColor('done', event)" class="buttonPrio buttonPrio_edit">
                          Done
                        </button>
                      </div>
                    </div>
                    <div style="margin-top: 24px; position: relative">
                      <label class="fontUnderHeadlinesAddTasks" for="subtask">Subtasks <span id="textSubtask">Please enter a text</span></label>
                      <br />
                      <input onkeydown="handleEnterKey(event)" id="subtask" class="focus_editTask" type="text" placeholder="Add new subtask"/>
                      <img onclick="addNewSubtaskPush(${index})" class="addSubtask" src="assets/img/add_task/add.svg" alt="plus icon"/>
                    </div>
                    <div id="subtaskArea">
 
                    </div>
                    <div>
                      <div>
                      </div>
                    </div>
                    </div>
                    </div>
                    <div class="footer_edit_task">
                      <button class="edit_task_btn blue_btn pointer" type="submit">
                          <p class="text_edit_task_btn">Ok</p>
                          <img class="img_white_btn img_width16" src="./assets/img/contacts/check.svg" alt="checked icon">
                      </button>
                    </div>
                </form>
                

          </section>`
}

function generateInputDateHTML(index) {
  return /*HTML */ `
      <label class="fontUnderHeadlinesAddTasks" for="date">Due date</label>
      <br/>
      <input type="date" id="date" class="focus_editTask dueDate_tasks" name="date" value='${allTasks[index][1]['due date']}' placeholder="dd/mm/yyyy" required/>`;
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
  return /* HTML */ ` 
      <div onclick="showContactOptions(event, ${i})" class="add_change_btn_mobile hide_desktop pointer">
        <img class="add_person_more_icon" src="assets/img/contacts/more_vert.svg" alt="add person icon"/>
      </div>
      <div class="head_overview">
        <div class="left_part_overview">
            <h2 class="headline_contacts">Contacts</h2>
            <div class="left_part_overview_second">
                <p class="text_contacts">Better with a team</p>
                <div class="seperator_line_content">
                </div>
            </div>
        </div>
        <div onclick="toggleContactView()" class="right_part_overview pointer hide_desktop">
            <img class="arrow_overview_back" src="./assets/img/general/arrow_left_line.svg" alt="arrow left">
        </div>
      </div>
                    <div class="floating_contact flex_dir_c d_none">
    <div class="head_floating_content">
      <div id="short_name_overview${i}" class="short_name_overview round_div">
        <p class="short_name_text_overview">${sortedContacts[i][1].letters}</p>
      </div>
      <div class="name_editable_content">
        <h3 class="name_overview">${sortedContacts[i][1].name}</h3>
        <div class="editable_content">
          <div onclick="editContact(event, ${i})" class="edit_content pointer">
            <img
              class="contact_edit_icon img_width24"
              src="assets/img/contacts/edit.svg"
              alt="edit icon"
            />
            <p>Edit</p>
          </div>
          <div onclick="deleteContact(event, ${i})" class="delete_content pointer">
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
        <p class="overview_mail">${sortedContacts[i][1].mail}</p>
      </div>
      <div class="contact_overview_phone">
        <h4>Phone</h4>
        <p>${sortedContacts[i][1].phone}</p>
      </div>
    </div>
    </div>`;
}

function generateContactOptionsInnerHTML(i) {
  return /*HTML*/ `
        <div onclick="editContact(event, ${i})" class="edit_content pointer">
            <img class="contact_edit_icon img_width24" src="assets/img/contacts/edit.svg" alt="edit icon">
            <p>Edit</p>
        </div>
        <div onclick="deleteContact(event, ${i})" class="delete_content pointer">
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
            <div class="dialog_content">
        <div class="top_dialog_add_edit flex_dir_c">
            <div class="head_top_dialog_add_edit flex_dir_c">
                <img class="img_logo" src="./assets/img/general/logo.svg" alt="join logo">
                <h3 class="headline_add_edit_contact">Edit contact</h3>
                <div class="seperator_line_content_contact">
                </div>
            </div>
        </div>
        <div class="short_name_container">
        <div id="create_contact_short_name_edit${index}" class="create_contact_short_name_edit round_div">
            <p class="short_name_text_overview_edit">${sortedContacts[index][1].letters}</p>
        </div>
        </div>
        <div class="bottom_dialog_add_edit">
            <form onsubmit="event.preventDefault(); saveNewData(${index})" class="create_contact_form">
                <label for="fullName_edit"></label>
                <input class="create_contact_input" minlength="2" type="text" id="fullName_edit" placeholder="Name" required>
                <label for="mail_edit"></label>
                <input class="create_contact_input" type="email" id="mail_edit" placeholder="Email" required>
                <label for="telNumber_edit"></label>
                <input class="create_contact_input" type="tel" id="telNumber_edit" pattern="^.+$" placeholder="Phone" required>
                <div class="container_button">
                    <button onclick="deleteContact(event, ${index})" type="button" class="cancel_create_contact_edit_btn contact_btn pointer">
                        <p class="text_cancel_create_contact_edit_btn">Delete</p>
                    </button>
                    <button class="blue_btn contact_btn pointer" type="submit">
                        <p class="text_create_contact_btn">Save</p>
                        <img class="img_checked_btn img_width24" src="./assets/img/contacts/check.svg" alt="checked icon">
                    </button>
                </div>
            </form>
        </div>
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
      <div class="subtask_container_edit">
        <img
          onclick="editSubtask('${subtaskId}')"
          class="iconSubtask"
          src="assets/img/add_task/edit.svg"
        />
        <span class="dividing_bar">|</span>
        <img
          onclick="removeSubtask('${subtaskId}')"
          class="iconSubtask"
          src="assets/img/add_task/delete.svg"
        />
      </div>
    </div>
  `;
}

function generateEditSubtaskInnerHTML(subtaskId, subtaskValue, iSubtask, iTask) {
  return /* HTML */ `
    <div id="${subtaskId}" class="subtaskGenerate">
      <p class="fontSubtask">- ${subtaskValue}</p>
      <div class="subtask_container_edit">
        <img
          onclick="editSubtaskEdit('${subtaskId}', ${iSubtask}, ${iTask})"
          class="iconSubtask"
          src="assets/img/add_task/edit.svg"
        />
        <span class="dividing_bar">|</span>
        <img
          onclick="deleteSubtaskEdit('${subtaskId}', ${iSubtask}, ${iTask})"
          class="iconSubtask"
          src="assets/img/add_task/delete.svg"
        />
      </div>
    </div>
  `;
}

function generateAssignedToFirst() {
  return /* HTML */ `
    "<option disabled selected>Select contacts to assign</option>"
  `;
}

function generatePushedMembers(element, color, letters) {
  return /* HTML */ `
    <div onclick="deleteSelectMember('${element}', '${color}', '${letters}')" id="${element}" class="profilbild" onmouseover="showTooltip(event, '${element}')" onmouseout="hideTooltip()">${letters}</div>
    <div id="tooltip" class="tooltip"></div>
    `;
}

function generateCategoryAfterClearDialogAddTask() {
  return /* HTML */ `
  <option disabled selected>Select task category</option>
  <option value="User Story">User Story</option>
  <option value="Technical Task">Technical Task</option>
  `
}

// Summary
function generateSummaryInnerHTML(upcomingDeadline, currentGreeting, numberUrgent, numberOpen, numberInProgress, numberAwaitFeedback, numberDone, numberAllTasks) {
  return /* HTML */ `
      <div class="containerSummary">
            <div class="marginSummary">
              <div class="containerHeadline d-flex">
                <h1 class="headlineSummary">Join 360</h1>
                <div class="spacerHeadline"></div>
                <span class="fontSizeMobil">Key Metrics at a Glance</span>
                <div class="spacerHeadlineMobil"></div>
              </div>
              <div class="mainSummary">
                <div class="topSummary">
                  <a href="./board.html" class="toDo summaryCardHover">
                    <div class="imgAndIcon">
                      <img class="iconSummary" src="assets/img/summary/edit.svg" alt=""/> 
                    </div>
                    <div class="doneMain">
                      <span class="sizeNumbersSummary" id="toDoNumber">${numberOpen}</span>
                      <span class="sizeTextSummary">To-do</span>
                    </div>
                  </a>
                  <a href="./board.html" class="done summaryCardHover">
                    <div class="imgAndIcon">
                      <img class="iconSummary" src="assets/img/summary/check.svg" alt=""/>                      
                    </div>
                    <div class="doneMain">
                      <span class="sizeNumbersSummary" id="doneNumber">${numberDone}</span>
                      <span class="sizeTextSummary">Done</span>
                    </div>
                  </a>
                </div>
                <a href="./board.html" class="urgent summaryCardHover">
                    <div class="d-flex container">
                        <img class="iconUrgent" src="assets/img/summary/circle-urgent.svg" alt="" />
                        <div class="doneMain">
                            <span class="sizeNumbersSummary" id="urgentNumber">${numberUrgent}</span>  
                            <span class="sizeTextSummary">Urgent</span>
                          </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="deadline">
                            <span class="deadlineMobil">${upcomingDeadline}</span>
                            <span class="deadlineTextMobil">Upcoming Deadline</span>
                        </div>
                </a>

                            <div class="bottomSummary d-flex">
                              <a href="./board.html" class="bottomCard summaryCardHover">
                                    <span class="sizeNumbersSummary" id="boardNumber">${numberAllTasks}</span>
                                    <span class="sizeTextSummary">Tasks in 
                                      <br />
                                    Board</span>
                              </a>
                  <a href="./board.html" class="bottomCard summaryCardHover">
                    <span class="sizeNumbersSummary" id="progressNumber">${numberInProgress}</span>
                    <span class="sizeTextSummary">Tasks in <br />
                      Progress</span>
                  </a>
                  <a href="./board.html" class="bottomCard summaryCardHover">
                    <span class="sizeNumbersSummary" id="feedbackNumber">${numberAwaitFeedback}</span>
                    <span class="sizeTextSummary"
                      >Awaiting <br />
                      Feedback</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="summaryText">
              <span class="goodMorningSummary">${currentGreeting}</span>
              <span class="nameSummary">Vorname Nachname </span>
            </div>
      </div>`;
}



