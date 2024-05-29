const { openDb } = require('../db'); // Ensure the path is correct to your db.js file

async function createTodo(description, status) {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO todos (description, status) VALUES (?, ?)',
    [description, status]
  );
  return result;
}
module.exports = {
  createTodo
};
