const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },
    password: {
        type: String,
        required: true,
        select: false // Do not return password by default
    },
    role: {
        type: String,
        enum: ['user', 'therapist', 'admin'],
        default: 'user'
    },
    preferences: {
        journalingInterval: { type: String, enum: ['Daily', 'Weekly', 'Custom'], default: 'Daily' },
        communitySupportOptIn: { type: Boolean, default: true }
    },
    privacySettings: {
        shareStatsWithTherapist: { type: Boolean, default: false },
        isProfilePrivate: { type: Boolean, default: true }
    },
    lastLogin: { type: Date },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Index for role-based admin queries
UserSchema.index({ role: 1 });

module.exports = mongoose.model('User', UserSchema);
