const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
console.log(todos);

const renderSavedItems = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};
renderSavedItems();

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("please enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      text: todoInput.value,
      completed: false,
    };
    createListElement(newTodo);
    todos.push(newTodo);
    console.log(todos);
    localStorage.setItem("TODOS", JSON.stringify(todos));

    todoInput.value = "";
  }
});

function createListElement(newTodo) {
  const { id, text, completed } = newTodo;
  const li = document.createElement("li");
  li.setAttribute("id", id);

  completed ? li.classList.add("checked") : "";

  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);

  const p = document.createElement("p");
  const pTextNode = document.createTextNode(text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  todoUl.appendChild(li);
}

todoUl.addEventListener("click", (e) => {
  console.log(e.target);
  const id = e.target.parentElement.getAttribute("id");
  console.log(id);
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();

    todos = todos.filter((todo) => todo.id != id);
  }
  localStorage.setItem("TODOS", JSON.stringify(todos));
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");
  }
});

todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

window.onload = function () {
  todoInput.focus();
};
