const {createTodo, deleteTodo, allTodosByListID, allTodosByDate, allTodosByPriority} = require('../model/todoModel');
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
async function getAllTodosByListID(req, res) {
  try {
    const { listID } = req.body;
    const lists = await allTodosByListID(listID);
    res.status(201).json({ message: 'Todos Returned', lists });
    console.log('Todos returned');
    console.log(lists);
  } catch (error) {
    console.error('Error getting Todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllTodosByDate(req, res) {
  try {
    const { date } = req.body;
    const lists = await allTodosByDate(date);
    res.status(201).json({ message: 'Todos Returned', lists });
    console.log('Todos returned');
    console.log(lists);
  } catch (error) {
    console.error('Error getting Todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllTodosByPriority(req, res) {
  try {
    const { priority } = req.body;
    const lists = await allTodosByPriority(priority);
    res.status(201).json({ message: 'Todos Returned', lists });
    console.log('Todos returned');
    console.log(lists);
  } catch (error) {
    console.error('Error getting Todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  module.exports = {
    createNewTodo,
    deleteTodos,
    getAllTodosByListID,
    getAllTodosByDate,
    getAllTodosByPriority
  };
  