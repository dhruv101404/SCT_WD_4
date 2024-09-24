const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
let tasks = [];
let editTaskId = null;  

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskText = document.getElementById('taskInput').value;
    const taskDateTime = document.getElementById('taskDateTime').value;

    
    if (editTaskId !== null) {
        tasks = tasks.map(task => {
            if (task.id === editTaskId) {
                return {
                    ...task,
                    text: taskText,
                    dateTime: taskDateTime
                };
            }
            return task;
        });
        editTaskId = null; 
    } else {
       
        const task = {
            id: Date.now(),
            text: taskText,
            dateTime: taskDateTime,
            completed: false
        };

        tasks.push(task);
    }

    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        const taskText = document.createElement('span');
        taskText.textContent = `${task.text} - ${new Date(task.dateTime).toLocaleString()}`;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        editBtn.addEventListener('click', () => editTask(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.append(taskText, completeBtn, editBtn, deleteBtn);
        taskList.appendChild(li);
    });
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    document.getElementById('taskInput').value = task.text;
    document.getElementById('taskDateTime').value = task.dateTime;
    editTaskId = id; 
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}
