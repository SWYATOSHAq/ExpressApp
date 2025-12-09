const express = require('express');
const router = express.Router();
const controller = require('../controllers/kanbanController');

router.get('/tasks', controller.getTasks);
router.get('/tasks/:id', controller.getTaskById);
router.post('/tasks', controller.createTask);
router.put('/tasks/:id', controller.updateTask);
router.delete('/tasks/:id', controller.deleteTask);

module.exports = router;
