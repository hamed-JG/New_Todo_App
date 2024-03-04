const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMassage = document.getElementById("alert-massage");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const showAlert = (massage, type) => {
  alertMassage.innerHTML = "";
  const alert = document.createElement("P");
  alert.innerText = massage;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMassage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>Todo not found!</td></tr>";
    return;
  }

  todos.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
        <button>Done</button>
        <button>Edit</button>
        <button>Delete</button>
        </td>
    </tr>
    `;
  });
};

const taskHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfully", "success");
  } else {
    showAlert("Please define a todo!", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared successfully", "success");
  } else {
    showAlert("Nothing to delete", "error");
  }
};

window.addEventListener("load", displayTodos());
addButton.addEventListener("click", taskHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
