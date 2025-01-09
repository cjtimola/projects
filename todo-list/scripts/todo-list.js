let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList () {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const { name, dueDate } = todoList[i];
    const html =
    `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="deleteTodo(${i});" class="todo-delete-button">Delete</button>
    `;

    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').
    innerHTML = todoListHTML;

}

function addTodo() {
  const nameElement = document.querySelector('.js-name-input');
  const dueDateElement = document.querySelector('.js-date-input');
  const name = nameElement.value;
  const dueDate = dueDateElement.value;

  todoList.push({name, dueDate});

  localStorage.setItem('todoList', JSON.stringify(todoList));

  nameElement.value = '';
  dueDateElement.value = '';

  renderTodoList();
}

function deleteTodo (index) {
  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  renderTodoList();
}