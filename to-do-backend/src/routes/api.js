const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');
const userController = require('../controller/userController');
const listController = require('../controller/listController');

router.post('/newTodo', todoController.createNewTodo);
router.delete('/deleteTodo', todoController.deleteTodo);
router.get('/getAllTodosByListID', todoController.getAllTodosByListID);
router.get('/getAllTodosByDate', todoController.getAllTodosByDate);
router.get('/getAllTodosByPriority', todoController.getAllTodosByPriority);

router.post('/newUser', userController.createNewUser);
router.put('/changeEmail', userController.changeEmailUser);
router.put('/changePassword', userController.changePasswordUser);

router.post('/newList', listController.createList);
router.get('/getAllLists', listController.getAllLists);
router.put('/editList', listController.editListName);
router.delete('/deleteList', listController.deleteListItems);

module.exports = router;
