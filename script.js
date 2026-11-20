// ToDoを追加・完了・削除する処理
// 保存先は、このブラウザ内のlocalStorageです。
const STORAGE_KEY = 'class-todo-items-v1';
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');
const remainingCount = document.getElementById('remaining-count');

let todos = loadTodos();
render();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === '') return;

  todos.push({ id: crypto.randomUUID(), text: text, completed: false });
  input.value = '';
  saveAndRender();
  input.focus();
});

function loadTodos() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  render();
}

function render() {
  list.replaceChildren();

  for (const todo of todos) {
    const item = document.createElement('li');
    item.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = todo.completed;
    check.setAttribute('aria-label', todo.text + 'を完了にする');
    check.addEventListener('change', () => {
      todo.completed = check.checked;
      saveAndRender();
    });

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '削除';
    deleteButton.setAttribute('aria-label', todo.text + 'を削除');
    deleteButton.addEventListener('click', () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveAndRender();
    });

    item.append(check, text, deleteButton);
    list.append(item);
  }

  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `残り ${remaining} 件`;
  emptyMessage.hidden = todos.length > 0;
}
