const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const trashList = document.querySelector('#side-trash .trash-list');

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

    const dragBtn = document.createElement('button');
    dragBtn,className = 'drag-btn';
    dragBtn.setAttribute('aria-lable', 'move');
    const img = document.createElement('img');
    img.src = 'icons/drag.svg';
    dragBtn.appendChild(img);

    deleteBtn.addEventListener('click', () => {
        moveToTrash(li);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(dragBtn)
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

function moveToTrash(li) {
    const text = li.querySelector('.task-text') ? li.querySelector('.task-text').textContent : li.textContent;
    // ensure trashList exists
    const trash = document.querySelector('#side-trash .trash-list');
    if (!trash) return;
    const tli = document.createElement('li');
    tli.className = 'trash-item';
    tli.textContent = text;
    trash.appendChild(tli);
    // remove original
    li.remove();
    SaveListItems();
}

function SaveListItems() {
    // save tasks
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const t = li.querySelector('.task-text') ? li.querySelector('.task-text').textContent : li.textContent;
        tasks.push(t);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // save trash
    const trashArr = [];
    const trash = document.querySelectorAll('#side-trash .trash-list li');
    trash.forEach(tli => trashArr.push(tli.textContent));
    localStorage.setItem('trash', JSON.stringify(trashArr));
}

function LoadListItems() {
    // load tasks
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(t => {
        const li = createTaskElement(t);
        taskList.appendChild(li);
    });
    // load trash
    const savedTrash = JSON.parse(localStorage.getItem('trash')) || [];
    const trash = document.querySelector('#side-trash .trash-list');
    savedTrash.forEach(t => {
        const tli = document.createElement('li');
        tli.className = 'trash-item';
        tli.textContent = t;
        trash.appendChild(tli);
    });
}

LoadListItems();

