let tasks = [];

function changeTheme(theme) {
    document.body.className = theme;
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;
}

setInterval(updateClock, 1000);
updateClock();

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value;
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    tasks.push({ text: taskText, completed: false });
    input.value = '';
    showTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    showTasks();
}

function showTasks() {
    const list = document.getElementById('taskList');
    const countEl = document.getElementById('count');
    list.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');
        const checked = tasks[i].completed ? 'checked' : '';
        const taskClass = tasks[i].completed ? 'completed' : '';

        li.className = taskClass;
        li.innerHTML = '<input type="checkbox" ' + checked + ' onclick="toggleTask(' + i + ')"> ' +
            '<span>' + tasks[i].text + '</span> ' +
            '<button onclick="deleteTask(' + i + ')">Delete</button>';
        list.appendChild(li);
    }

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    countEl.textContent = 'Total Tasks: ' + total + ' | Completed: ' + completed;
}