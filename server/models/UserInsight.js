const mongoose = require('mongoose');

const UserInsightSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    period: {
        type: String,
        enum: ['Weekly', 'Monthly'],
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    moodAverage: { type: Number },
    moodDistribution: {
        type: Map,
        of: Number // e.g., { 'Happy': 10, 'Sad': 2 }
    },
    journalFrequency: { type: Number },
    goalCompletionRate: { type: Number },

    aiSummary: { type: String },
    topEmotions: [{ type: String }],

    isRead: { type: Boolean, default: false }
}, { timestamps: true });

// Compund index for historical lookup
UserInsightSchema.index({ user: 1, endDate: -1 });

module.exports = mongoose.model('UserInsight', UserInsightSchema);
