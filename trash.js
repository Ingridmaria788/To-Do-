const trashList = document.getElementById('trash-list');

function LoadTrashItems() {
    const trashed = JSON.parse(localStorage.getItem('trash')) || [];
    trashList.innerHTML = '';
    trashed.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        trashList.appendChild(li);
    });
}

LoadTrashItems();