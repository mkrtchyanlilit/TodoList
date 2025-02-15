const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

//GET TODOS
async function fetchTodos() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?userId=1"
    );
    const todos = await response.json();
    taskList.innerHTML = "";
    todos.forEach((todo) => {
      const li = createTaskElement(todo.title, todo.completed);
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

function createTaskElement(taskText, isCompleted, id) {
  const li = document.createElement("li");
  li.setAttribute("data-id", id);

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
  deleteBtn.textContent = "Delete";
  deleteBtn.style.color = "red";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.color = "green";

  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  editBtn.addEventListener("click", () => {
    // const taskId = li.getAttribute("data-id");
    // updateTask(taskId, li);
    console.log("updating");
  });

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  return li;
}

//ADD TODOS
async function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1",
    {
      method: "POST",
      body: JSON.stringify({
        title: taskText,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const task = await response.json();
  const li = createTaskElement(task.title, task.completed);
  taskList.appendChild(li);
  taskInput.value = "";
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});


//UPDATE TODOS
// async function updateTask(id, li) {
//   const taskText = taskInput.value.trim();

//   const checkbox = li.querySelector("input[type='checkbox']");
//   const updatedTask = {
//     userId: 1,
//     id: id,
//     title: taskText,
//     completed: checkbox.checked,
//   };

//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/todos/${id}`,
//     {
//       method: "PUT",
//       body: JSON.stringify(updatedTask),
//       headers: {
//         "Content-type": "application/json",
//       },
//     }
//   );
//   const task = await response.json();

//   const p = li.querySelector("p");
//   p.textContent = task.title;
//   checkbox.checked = task.completed;
//   p.classList.toggle("completed", task.completed);
//   taskInput.value = "";
// }

fetchTodos();