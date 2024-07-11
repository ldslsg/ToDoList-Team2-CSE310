const { openDb } = require('../db'); 

// create new item (to-do)
async function createTodo(nameTodo, description, date, list_id) {
  const db = await openDb();
  const result = await db.run(
      'INSERT INTO to_dos (name, description, deadline_date, status, priority, list_id) VALUES (?, ?, ?, "Not Completed", "True", ?)',
      [nameTodo, description,date, list_id]
  );
  return result;
}

// delete item (to-do)
async function deleteTodo(todoID) {
  const db = await openDb();
  const result = await db.run(
    'DELETE FROM to_dos WHERE to_dos_id = ?',
    [todoID]
  )
  return result;
}

// get all items in a list (to-do)
async function allTodosByListID(listID) {
  const db = await openDb();
  const result = await db.all(
    'SELECT * FROM to_dos WHERE list_id = ?',
    // status = "Not Completed"
    [listID]
  );
  return result;
}

// get all items with a deadline of today (to-do)
async function allTodosByDate(UserID) {
  const db = await openDb();
  const result = await db.all(
    "SELECT name FROM to_dos INNER JOIN list ON to_dos.list_id = list.list_id WHERE date(deadline_date) = date('now') AND user_id = ? AND status = 'Not Completed'",
    [UserID]
  );
  return result;
}

// get all items with a priority of True (to-do)
async function allTodosByPriority(UsesrID) {
  const db = await openDb();
  const result = await db.all(
    'SELECT name FROM to_dos INNER JOIN list ON to_dos.list_id = list.list_id WHERE priority = "True" and status = "Not Completed" and user_id = ?'
    , [UsesrID]
  );
  return result;
}

// edit item (to-do) can be name, description, date or a combination
async function editToDos(todoID, nameTodo, description , date,) {
  const db = await openDb();
  const result = await db.run(
    'UPDATE to_dos SET name = ?, description = ?, deadline_date = ? WHERE to_dos_id = ?',
    [nameTodo, description, date, todoID]
  );
  return result;
}

// update status of item (to-do)
async function updateStatus(todoID) {
  const db = await openDb();
  const result = await db.run(
    'UPDATE to_dos SET status = "Completed" where to_dos_id = ?',
    [todoID]
  );
  return result;
}

module.exports = {
  createTodo,
  deleteTodo,
  allTodosByListID,
  allTodosByDate,
  allTodosByPriority,
  editToDos,
  updateStatus
};