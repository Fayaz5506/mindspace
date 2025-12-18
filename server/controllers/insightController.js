const Journal = require('../models/Journal');
const Mood = require('../models/Mood');
const Goal = require('../models/Goal');
const aiService = require('../services/aiService');

// @desc    Get user insights and trends
// @route   GET /api/insights
// @access  Private
const getUserInsights = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get mood entries and journals for the last 14 days for better pattern detection
        const analysisPeriod = new Date();
        analysisPeriod.setDate(analysisPeriod.getDate() - 14);

        const moods = await Mood.find({
            user: userId,
            date: { $gte: analysisPeriod }
        }).sort({ date: 1 });

        const journals = await Journal.find({
            user: userId,
            createdAt: { $gte: analysisPeriod }
        }).sort({ createdAt: 1 });

        // Get goal progress
        const goals = await Goal.find({ user: userId });
        const completedGoals = goals.filter(g => g.current >= g.target).length;

        // Perform AI Pattern Analysis
        const patternData = aiService.analyzeMoodPatterns(journals, moods);

        res.status(200).json({
            moodTrends: moods,
            weeklyJournalCount: journals.filter(j => j.createdAt >= (new Date() - 7 * 24 * 60 * 60 * 1000)).length,
            goalStats: {
                total: goals.length,
                completed: completedGoals
            },
            aiInsight: {
                summary: patternData.summary,
                trend: patternData.trend,
                explanation: patternData.explainability,
                topEmotions: patternData.topEmotions,
                moodAverage: patternData.moodAverage,
                moodDirection: patternData.moodDirection
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching insights' });
    }
};

module.exports = { getUserInsights };
