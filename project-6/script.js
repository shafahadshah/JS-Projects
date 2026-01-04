const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const notify = document.getElementById("notify");
const taskPanel = document.getElementById("taskPanel");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

if (tasks.length > 0) taskPanel.classList.remove("hidden");

function showNotification(text) {
  notify.textContent = text;
  notify.style.right = "20px";
  setTimeout(() => notify.style.right = "-300px", 2000);
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const task = {
    title: title.value,
    due: dueDate.value,
    priority: priority.value
  };

  if (editIndex === null) {
    tasks.push(task);
    showNotification("✅ Task Added");
  } else {
    tasks[editIndex] = task;
    editIndex = null;
    showNotification("✏️ Task Updated");
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskPanel.classList.remove("hidden");
  render();
  form.reset();

  // auto smooth scroll to bottom
  setTimeout(() => {
    taskList.scrollTop = taskList.scrollHeight;
  }, 100);
});

function render() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = `task ${task.priority}`;

    div.innerHTML = `
      <h3>${task.title}</h3>
      <small>⏰ ${task.due || "No due date"}</small>

      <div class="actions">
        <button class="complete" onclick="completeTask(${index})">Complete</button>
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(div);
  });
}

function completeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
  showNotification("🎉 Task Completed");

  if (tasks.length === 0) taskPanel.classList.add("hidden");
}

function editTask(index) {
  const task = tasks[index];
  title.value = task.title;
  dueDate.value = task.due;
  priority.value = task.priority;
  editIndex = index;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
  showNotification("🗑 Task Deleted");

  if (tasks.length === 0) taskPanel.classList.add("hidden");
}

render();
