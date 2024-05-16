const BASE_URL = 'https://join-156-default-rtdb.europe-west1.firebasedatabase.app/';

/**
 * This function initializes Firebase by first fetching contacts data from a JSON file.
 * It then iterates through each contact, posting it to the 'contacts' path on Firebase.
 * After posting all contacts, it loads the contacts data again from Firebase. 
 */
async function initialLoadContactsFirebase() {
    let response = await fetch('./js/contacts.json');
    contacts = await response.json();

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        postData('contacts', { name: contact.name, mail: contact.mail, phone: contact.phone, color: contact.color, letters: contact.letters });
    }
    await loadData('contacts');
}

async function initialLoadUsersFirebase() {
    let response = await fetch('./js/users.json');
    users = await response.json();

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        postData('users', { name: user.name, mail: user.mail, password: user.password });
    }
    await loadData('users');
}

async function initialLoadTasksFirebase() {
    let response = await fetch('./js/addTasks.json');
    tasks = await response.json();

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        postData('tasks', { id: task.id, title: task.title, description: task.description, "due date": task["due date"], prio: task.prio, category: task.category, status: task.status, "assigned member": task["assigned member"], subtask: task.subtask });
    }
    await loadData('tasks');
}

/**
 * This function loads data from the specified path using a fetch request.
 * It constructs the full URL by combining the BASE_URL and the provided path, then sends a GET request.
 * After receiving the response, it parses the JSON data and returns it as a Promise.
 * @param {string} path - The path from which to load the data.
 * @returns {Promise} - A Promise object that resolves to the loaded data.
 */
async function loadData(path = '') {
    let response = await fetch(BASE_URL + path + '.json');
    return data = await response.json();
}


/**
 * This function posts data to the specified path using a fetch request.
 * It constructs the full URL by combining the BASE_URL and the provided path, then sends a POST request
 * with the provided data as the request body. It expects a JSON response and returns it as a Promise. 
 * @param {string} path - The path to which to post the data.
 * @param {object} data - The data to be posted.
 * @returns {Promise} - A Promise object that resolves to the response data.
 */
async function postData(path = '', data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return resonseToJSON = await response.json();
}


/**
 * This function edits data at the specified path using a fetch request.
 * It constructs the full URL by combining the BASE_URL and the provided path, then sends a PATCH request
 * with the provided data as the request body. It expects a JSON response and returns it as a Promise. 
 * @param {string} path - The path of the data to be edited.
 * @param {object} data - The data with which to edit.
 * @returns {Promise} - A Promise object that resolves to the response data.
 */
async function editData(path = '', data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return resonseToJSON = await response.json();
}


/**
 * This function deletes data from the specified path using a fetch request with the DELETE method.
 * It constructs the full URL by combining the BASE_URL and the provided path, then sends a DELETE request.
 * After the deletion is completed, it returns the response data as a Promise.
 * @param {string} path - The path from which to delete the data.
 * @returns {Promise} - A Promise object that resolves to the response data.

 */
async function deleteData(path = '') {
    let response = await fetch(BASE_URL + path + '.json', {
        method: "DELETE",
    });
    return responseToJSON = await response.json();
}