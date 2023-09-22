const input = document.getElementById("input");
const form = document.getElementById("form");
const todos = document.querySelector(".todos");
const todosLS = JSON.parse(localStorage.getItem("todos"));
if (todosLS) {
  todosLS.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let todoText = input.value;
  addTodo(todoText);
});

function addTodo(todo) {
  let text;
  if (typeof todo === "string") {
    text = todo;
  } else {
    text = todo.text;
  }
  if (text) {
    const li = document.createElement("li");
    li.innerText = text;
    if (todo.completed) {
      li.classList.add("completed");
    }
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      updateLS();
    });
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      li.remove();
      updateLS();
    });
    todos.prepend(li);
    input.value = "";
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach((todo) =>
    todos.unshift({
      text: todo.innerText,
      completed: todo.classList.contains("completed"),
    })
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}
