const {createTodo, deleteTodo} = require('../model/todoModel');
async function createNewTodo(req, res) {
  try {
    const {nameTodo, description, deadline_date,  priority, list_id} = req.body;
    await createTodo(nameTodo, description, deadline_date,  priority, list_id);
    res.status(201).json({ message: 'Item created' });
    console.log('Item created');
  } catch (error) {
    console.error('Error creating new item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteTodos(req, res) {
  try {
    const { todoID } = req.body;
    await deleteTodo(todoID);
    res.status(201).json({ message: 'Item deleted' });
    console.log('Item deleted');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

  module.exports = {
    createNewTodo,
    deleteTodos
  };
  