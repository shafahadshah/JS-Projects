const addBtn = document.querySelector("#addBtn");
const addInput = document.querySelector("#addInput");
const ul = document.querySelector("ul");
const alertBox = document.querySelector("#alertBox");

// ✅ Function to show animated alert
function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className = `show ${type}`;
  setTimeout(() => {
    alertBox.className = alertBox.className.replace("show", "");
  }, 2000);
}

addBtn.addEventListener("click", () => {
  const taskText = addInput.value.trim();

  if (taskText === "") {
    showAlert("⚠️ Please enter a task!", "error");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete-btn"></button>
  `;

  // delete logic
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.classList.add("remove-anim");
    setTimeout(() => li.remove(), 600);
  });

  ul.appendChild(li);
  addInput.value = "";
  showAlert("✅ Task added successfully!", "success");
});
