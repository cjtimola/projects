let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList () {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html =
    `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="todo-delete-button js-todo-delete-button">Delete</button>
    `;

    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').
    innerHTML = todoListHTML;

  // Delete Todo
  document.querySelectorAll('.js-todo-delete-button')
    .forEach((deleteButtonElement, index) => {
      deleteButtonElement.addEventListener('click', () => {
        todoList.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        renderTodoList();
      });
    });
}

// Add Todo
document.querySelector('.js-todo-add-button')
  .addEventListener('click', () => {
    const nameElement = document.querySelector('.js-name-input');
    const dueDateElement = document.querySelector('.js-date-input');
    const name = nameElement.value;
    const dueDate = dueDateElement.value;

    todoList.push({name, dueDate});

    localStorage.setItem('todoList', JSON.stringify(todoList));

    nameElement.value = '';
    dueDateElement.value = '';

    renderTodoList();
  });
