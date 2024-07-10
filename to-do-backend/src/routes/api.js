const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');
const userController = require('../controller/userController');
const listController = require('../controller/listController');

// routes that effect items (todos)
router.post('/newTodo', todoController.createNewTodo);
router.delete('/deleteTodo', todoController.deleteTodos);
router.get('/getAllTodosByListID', todoController.getAllTodosByListID);
router.get('/getAllTodosByDate', todoController.getAllTodosByDate);
router.get('/getAllTodosByPriority', todoController.getAllTodosByPriority);
router.put('/editToDos', todoController.editTodo);
router.put('/updateStatus', todoController.updateStatusComplete);

// routes that effect users
router.post('/newUser', userController.createNewUser);
router.put('/changeEmail', userController.changeEmailUser);
router.put('/changePassword', userController.changePasswordUser);

// routes that effect lists
router.post('/newList', listController.createList);
router.get('/getAllLists', listController.getAllLists);
router.put('/editList', listController.editListName);
router.delete('/deleteList', listController.deleteListItems);

module.exports = router;