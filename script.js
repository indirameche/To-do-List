
window.onload = function() {
  loadTasks();
  

  document.getElementById("addBtn").addEventListener("click", addTask);
};


function addTask() {
  const taskInput = document.getElementById("taskInput");
  const duedateInput = document.getElementById("dueDateInput");
  const taskText = taskInput.value.trim();
  const dueDate = duedateInput.value;
  const tasklist = document.getElementById("taskList");

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = ""; // Clear input
}


function createTaskElement(taskText, isCompleted = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  if (isCompleted) span.classList.add("completed");

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("btns");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete-btn");
  completeBtn.onclick = function () {
    span.classList.toggle("completed");
    updateStorage();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = function () {
    li.remove();
    updateStorage();
  };

  btnDiv.appendChild(completeBtn);
  btnDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnDiv);

  document.getElementById("taskList").appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update localStorage after task complete/delete
function updateStorage() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("span").classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}