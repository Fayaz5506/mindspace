const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    mood: {
        type: String, // Enhanced mood tagging for specific entries
        enum: ['Happy', 'Calm', 'Neutral', 'Sad', 'Anxious', 'Angry', 'Grateful'],
        default: 'Neutral'
    },
    tags: [{
        type: String
    }],
    isPrivate: {
        type: Boolean,
        default: true
    },
    gratitude: [{
        type: String
    }],
    attachments: [{
        type: String // URLs to encrypted storage for voice/images
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Compound index for optimized "My Journals" feed
JournalSchema.index({ user: 1, createdAt: -1 });
// Index for mood-based analytics
JournalSchema.index({ mood: 1, createdAt: 1 });

module.exports = mongoose.model('Journal', JournalSchema);
