const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoalProgress, deleteGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getGoals)
    .post(protect, createGoal);

router.route('/:id')
    .put(protect, updateGoalProgress)
    .delete(protect, deleteGoal);

module.exports = router;
