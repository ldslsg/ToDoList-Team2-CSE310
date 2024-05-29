const express = require('express');
const router = express.Router();
const todoController= require('../controller/todoController');

router.post('/newTodo', todoController.createNewTodo);

module.exports = router;
