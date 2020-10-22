const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskMiddleware = require('../middlewares/TaskMiddleware');

router.post('/task', TaskMiddleware, TaskController.create);

module.exports = router;