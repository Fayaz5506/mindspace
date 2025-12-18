const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    category: {
        type: String,
        enum: ['Journaling', 'Meditation', 'Sleep', 'Exercise', 'Social', 'Other'],
        default: 'Other'
    },
    frequency: {
        type: String, // e.g., 'daily', 'weekly'
        default: 'daily'
    },
    targetCount: {
        type: Number,
        default: 1
    },
    currentCount: {
        type: Number,
        default: 0
    },
    completedDates: [Date],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Goal', GoalSchema);
