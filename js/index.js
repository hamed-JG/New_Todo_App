const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMassage = document.getElementById("alert-massage");

const todos = [];

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

const taskHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = { task: task, date: date, completed: false };
  if (task) {
    todos.push(todo);
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfully", "success");
    console.log(todos);
  } else {
    showAlert("Please define a todo!", "error");
  }
};
addButton.addEventListener("click", taskHandler);
