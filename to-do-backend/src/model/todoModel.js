const { openDb } = require('../db'); 

async function createTodo(nameTodo, description, deadline_date, priority, list_id) {
  const db = await openDb();
  const result = await db.run(
      'INSERT INTO to_dos (name, description, deadline_date, status, priority, list_id) VALUES (?, ?, ?, "Not Completed", ?, ?)',
      [nameTodo, description, deadline_date, priority, list_id]
  );
  return result;
}

async function deleteTodo(todoID) {
  const db = await openDb();
  const result = await db.run(
    'DELETE FROM to_dos WHERE to_dos_id = ?',
    [todoID]
  )
  return result;
}
async function allTodosByListID(listID) {
  const db = await openDb();
  const result = await db.all(
    'SELECT * FROM to_dos WHERE list_id = ?',
    [listID]
  );
  return result;
}

async function allTodosByDate(date) {
  const db = await openDb();
  const result = await db.all(
    'SELECT * FROM to_dos WHERE deadline_date = ?',
    [date]
  );
  return result;
}

async function allTodosByPriority(priority) {
  const db = await openDb();
  const result = await db.all(
    'SELECT * FROM to_dos WHERE priority = ?',
    [priority]
  );
  return result;
}

module.exports = {
  createTodo,
  deleteTodo,
  allTodosByListID,
  allTodosByDate,
  allTodosByPriority
};
