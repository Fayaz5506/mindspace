const mongoose = require('mongoose');

const CommunityPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isAnonymous: {
        type: Boolean,
        default: true
    },
    reactions: [{
        type: String // support, heart, hug
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    isFlagged: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'flagged'],
        default: 'approved'
    },
    flagReason: {
        type: String
    },
    needsUrgentReview: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Index for moderation dashboard
CommunityPostSchema.index({ status: 1, needsUrgentReview: -1 });

module.exports = mongoose.model('CommunityPost', CommunityPostSchema);
