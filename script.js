const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const progressCount = document.getElementById('progressCount');
const progressFill = document.getElementById('progressFill');
const statusMessage = document.getElementById('statusMessage');

let tasks = [];

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  let completedCount = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : 'new-item';
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="toggle" onclick="toggleTask(${index})">✔️</button>
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button class="delete" onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);

    if (task.completed) completedCount++;
  });

  updateProgress(completedCount, tasks.length);
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function updateProgress(completed, total) {
  progressCount.textContent = `${completed}/${total}`;
  const percent = total ? (completed / total) * 100 : 0;
  progressFill.style.width = percent + '%';

  if (total === 0) {
    statusMessage.textContent = 'Add some tasks!';
  } else if (percent === 100) {
    statusMessage.textContent = 'All task complete! 🎉';
  } else {
    statusMessage.textContent = `You have completed ${percent.toFixed(0)}% of your tasks.`;
  }
}

renderTasks();
