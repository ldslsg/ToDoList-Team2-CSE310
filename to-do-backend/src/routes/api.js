
const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');
const userController = require('../controller/userController');
const listController = require('../controller/listController');

router.post('/newTodo', todoController.createNewTodo);

router.post('/newList', listController.createList);
router.post('/newUser', userController.createNewUser);
router.post('/login', userController.loginUser);
router.get('/getAllLists', listController.getAllLists);
router.put('/changeEmail', userController.changeEmailUser);
router.put('/changePassword', userController.changePasswordUser);
router.put('/editList', listController.editListName);
router.delete('/deleteList', listController.deleteListItems);

module.exports = router;
