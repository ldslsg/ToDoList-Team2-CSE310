
const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');
const userController = require('../controller/userController');
const listController = require('../controller/listController');

router.post('/newTodo', todoController.createNewTodo);

router.post('/newList', listController.createList);
router.post('/newUser', userController.createNewUser);
router.get('/getAllLists', listController.getAllLists);
router.get('/getAllTodosByListID', todoController.getAllTodosByListID);
router.get('/getAllTodosByDate', todoController.getAllTodosByDate);
router.get('/getAllTodosByPriority', todoController.getAllTodosByPriority);
router.put('/changeEmail', userController.changeEmailUser);
router.put('/changePassword', userController.changePasswordUser);
router.put('/editList', listController.editListName);
router.delete('/deleteList', listController.deleteListItems);

module.exports = router;
