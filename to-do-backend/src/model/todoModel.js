const { openDb } = require('../db'); // Ensure the path is correct to your db.js file

async function createTodo(description, status) {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO todos (description, status) VALUES (?, ?)',
    [description, status]
  );
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
  allTodosByListID,
  allTodosByDate,
  allTodosByPriority
};
