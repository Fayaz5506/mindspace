const Mood = require('../models/Mood');

// @desc    Get mood history
// @route   GET /api/moods
// @access  Private
const getMoods = async (req, res) => {
    const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(moods);
};

// @desc    Log mood
// @route   POST /api/moods
// @access  Private
const logMood = async (req, res) => {
    if (!req.body.value || !req.body.label) {
        return res.status(400).json({ message: 'Please provide value and label' });
    }

    const mood = await Mood.create({
        user: req.user.id,
        value: req.body.value,
        label: req.body.label,
        note: req.body.note
    });

    res.status(201).json(mood);
};

module.exports = {
    getMoods,
    logMood,
};
