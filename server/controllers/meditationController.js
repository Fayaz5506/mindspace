const Meditation = require('../models/Meditation');

// @desc    Get all meditations
// @route   GET /api/meditations
// @access  Private
const getMeditations = async (req, res) => {
    try {
        const meditations = await Meditation.find({});
        res.json(meditations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a meditation (Admin only)
// @route   POST /api/meditations
// @access  Private/Admin
const createMeditation = async (req, res) => {
    try {
        const meditation = await Meditation.create(req.body);
        res.status(201).json(meditation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getMeditations,
    createMeditation
};
