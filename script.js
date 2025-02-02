const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

async function fetchTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await response.json();
    let first20 = todos.slice(0, 20);
    first20.forEach((todo) => {
      const li = createTaskElement(todo.title, todo.completed);
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

function createTaskElement(taskText, isCompleted) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;
  const p = document.createElement("p");
  p.textContent = taskText;
  if (isCompleted) {
    p.classList.add("completed");
  }

  checkbox.addEventListener("change", () => {
    p.classList.toggle("completed", checkbox.checked);
  });
  li.appendChild(checkbox);
  li.appendChild(p);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  li.appendChild(deleteBtn);
  return li;
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = createTaskElement(taskText, false);
  taskList.appendChild(li);

  taskInput.value = "";
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

fetchTodos();
