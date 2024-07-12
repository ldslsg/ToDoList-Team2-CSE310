const {createTodo, deleteTodo, allTodosByListID, allTodosByDate, allTodosByPriority, editToDos, updateStatus, allCompleteTodosByListID} = require('../model/todoModel');

// create new item (to-do)
async function createNewTodo(req, res) {
  try {
    const {nameTodo, description, date, list_id} = req.body;
    await createTodo(nameTodo, description,  date , list_id);
    res.status(201).json({ message: 'Item created' });
    console.log('Item created');
  } catch (error) {
    console.error('Error creating new item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// delete item (to-do)
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

// get all items in a list (to-do)
async function getAllTodosByListID(req, res) {
  try {
    const { listID } = req.query;
    const lists = await allTodosByListID(listID);
    res.status(201).json({ message: 'Todos Returned', lists });
    console.log('Todos returned');
    console.log(lists);
  } catch (error) {
    console.error('Error getting Todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// get all COMPLETED items in a list (to-do)
async function getAllCompleteTodosByListID(req, res) {
  try {
    const { listID } = req.query;
    const lists = await allCompleteTodosByListID(listID);
    res.status(201).json({ message: 'Todos Returned', lists });
    console.log('Completed Todos returned');
    console.log(lists);
  } catch (error) {
    console.error('Error getting Todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// get all items with a deadline of today (to-do)
async function getAllTodosByDate(req, res) {
  try {
    const { UserID } = req.query;
    console.log("Received UserID - by date:", UserID);
    const lists = await allTodosByDate(UserID);
    console.log("Todos returned by date:", lists);
    res.status(201).json({ message: 'Todos Returned', lists });
  } catch (error) {
    console.error('Error getting Todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// get all items with a priority of True (to-do)
async function getAllTodosByPriority(req, res) {
  try {
    const { UserID} = req.body;
    const lists = await allTodosByPriority(UserID);
    res.status(201).json({ message: 'Todos Returned', lists });
    console.log('Todos returned');
    console.log(lists);
  } catch (error) {
    console.error('Error getting Todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// edit item (to-do) can be name, description, date or a combination
async function editTodo(req, res) {
  try {
    const { todoID, nameTodo, description, date } = req.body;
    await editToDos(todoID, nameTodo, description, date);
    res.status(201).json({ message: 'Item edited' });
    console.log('Item edited');
  } catch (error) {
    console.error('Error editing item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// update status of item (to-do)
async function updateStatusComplete(req, res) {
  try {
    const { todoID} = req.body;
    await updateStatus(todoID);
    res.status(201).json({ message: 'Status updated' });
    console.log('Status updated');
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// exports
  module.exports = {
    createNewTodo,
    deleteTodos,
    getAllTodosByListID,
    getAllCompleteTodosByListID,
    getAllTodosByDate,
    getAllTodosByPriority,
    editTodo,
    updateStatusComplete
  };
  