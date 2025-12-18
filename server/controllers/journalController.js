const Journal = require('../models/Journal');

// @desc    Get journals
// @route   GET /api/journals
// @access  Private
const getJournals = async (req, res) => {
    const journals = await Journal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(journals);
};

// @desc    Create journal
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res) => {
    if (!req.body.content) {
        return res.status(400).json({ message: 'Please add content' });
    }

    const journal = await Journal.create({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content,
        mood: req.body.mood,
        tags: req.body.tags,
        gratitude: req.body.gratitude,
        isPrivate: req.body.isPrivate
    });

    res.status(201).json(journal);
};

// @desc    Update journal
// @route   PUT /api/journals/:id
// @access  Private
const updateJournal = async (req, res) => {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
        return res.status(404).json({ message: 'Journal not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the journal user
    if (journal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedJournal = await Journal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedJournal);
};

// @desc    Delete journal
// @route   DELETE /api/journals/:id
// @access  Private
const deleteJournal = async (req, res) => {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
        return res.status(404).json({ message: 'Journal not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the journal user
    if (journal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await journal.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getJournals,
    createJournal,
    updateJournal,
    deleteJournal,
};
