let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = document.getElementById('task-list');

function addTask() {
    let task = taskInput.value.trim();
    if (task) {
        let listItem = document.createElement('li');
        listItem.textContent= task;
        taskList.appendChild(listItem);
        taskInput.value = '';
        SaveListItems(); 
    }
}

addButton.addEventListener('click', addTask); 
taskInput.addEventListener('keypress', function(event){ // Listen for keypress events
    if (event.key === 'Enter') { 
        addTask();
    } // Add task on Enter key press
});

function SaveListItems() {
    let task = []; 
    for (let i = 0; i < taskList.children.length; i++) { // Loop through list items
        task.push(taskList.children[i].textContent); // Add each item's text to the array
    }
    localStorage.setItem('tasks', JSON.stringify(task)); // Save the array to local storage
}

function LoadListItems() {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')); // Retrieve saved tasks from local storage
    if (savedTasks) {
        for (let i = 0; i < savedTasks.length; i++) { // Loop through saved tasks
            let listItem = document.createElement('li');
            listItem.textContent = savedTasks[i]; // Set the text content
            taskList.appendChild(listItem); // Add the item to the task list
        }
    }
}
LoadListItems();
