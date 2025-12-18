const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: Number, // 1 to 5 scale? Or 1-10? Let's use 1-5 for simplicity.
        required: true,
        min: 1,
        max: 5
    },
    label: {
        type: String, // 'Terrible', 'Bad', 'Okay', 'Good', 'Great'
        required: true
    },
    note: {
        type: String,
        trim: true,
        maxlength: 200
    },
    date: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Optimized for retrieving user trends over time
MoodSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Mood', MoodSchema);
