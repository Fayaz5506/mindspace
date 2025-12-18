const mongoose = require('mongoose');

const MeditationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        enum: ['Stress', 'Sleep', 'Focus', 'Anxiety', 'General'],
        default: 'General'
    },
    duration: String, // e.g., '5 mins'
    audioUrl: String,
    imageUrl: String,
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meditation', MeditationSchema);
