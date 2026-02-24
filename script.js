const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

function createTaskElement(text) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', 'delete');
    deleteBtn.textContent = '🗑';

    deleteBtn.addEventListener('click', () => {
    const trashed = JSON.parse(localStorage.getItem('trash')) || [];
    trashed.push(span.textContent);
    localStorage.setItem('trash', JSON.stringify(trashed));
    li.remove();
    SaveListItems();
});

    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        const li = createTaskElement(task);
        taskList.appendChild(li);
        taskInput.value = '';
        SaveListItems();
    }
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') addTask();
});

function SaveListItems() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const t = li.querySelector('.task-text').textContent;
        tasks.push(t);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function LoadListItems() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(t => {
        const li = createTaskElement(t);
        taskList.appendChild(li);
    });
}

LoadListItems();