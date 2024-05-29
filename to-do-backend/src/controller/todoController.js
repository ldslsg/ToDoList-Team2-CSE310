const {createTodo} = require('../model/todoModel');
  
  async function createNewTodo(req, res) {
    try {
      const { description, status } = req.body;
      await createTodo(description, status);
      res.status(201).json({ message: 'To-do created' });
      console.log('To-do created');
    } catch (error) {
      console.error('Error creating to-do item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  module.exports = {
    createNewTodo,
  };
  