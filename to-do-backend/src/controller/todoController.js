const {createTodo} = require('../model/todoModel');
  
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
    getAllTodosByListID,
    getAllTodosByDate,
    getAllTodosByPriority
  };
  