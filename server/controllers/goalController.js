const Goal = require('../models/Goal');

// @desc    Get all goals for a user
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
const createGoal = async (req, res) => {
    try {
        const { title, description, category, frequency, targetCount } = req.body;
        const goal = await Goal.create({
            user: req.user.id,
            title,
            description,
            category,
            frequency,
            targetCount
        });
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update goal progress
// @route   PUT /api/goals/:id
// @access  Private
const updateGoalProgress = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        if (goal.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        goal.currentCount += 1;
        if (goal.currentCount >= goal.targetCount) {
            goal.completedDates.push(new Date());
            // Reset for next period? Or mark as completed?
            // For now, let's just track completion dates.
        }

        await goal.save();
        res.json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        if (goal.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        await goal.deleteOne();
        res.json({ message: 'Goal removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGoals,
    createGoal,
    updateGoalProgress,
    deleteGoal
};
