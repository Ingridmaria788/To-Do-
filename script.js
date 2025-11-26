let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = document.getElementById('task-list');

function addTask() {
    let task = taskInput.value.trim();
    if (task) {
        let listItem = document.createElement('li');
        listItem.textContent = task;
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}

addButton.addEventListener('click', addTask); 
taskInput.addEventListener('keypress', function(event){ // Listen for keypress events
    if (event.key === 'Enter') { 
        addTask();
    } // Add task on Enter key press
});


