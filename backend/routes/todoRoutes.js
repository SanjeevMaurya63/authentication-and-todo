const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo } = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.route('/').get(getTodos).post(createTodo);
router.route('/:id').put(updateTodo).delete(deleteTodo);
router.patch('/:id/toggle', toggleTodo);

module.exports = router;
