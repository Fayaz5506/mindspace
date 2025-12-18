/**
 * AI Service for MindSpace
 * Analyzes journal entries and mood logs to identify patterns.
 * Focuses on explainability and non-diagnostic insights.
 */

const analyzeMoodPatterns = (journals, moods) => {
    if (!journals.length && !moods.length) {
        return {
            trend: 'Neutral',
            summary: "I don't have enough data yet to see a pattern. Keep journaling and logging your mood!",
            explainability: "No entries found for the analyzed period.",
            topEmotions: []
        };
    }

    // 1. Analyze Mood Trends (Numerical)
    const moodValues = moods.map(m => m.value);
    const avgMood = moodValues.length ? (moodValues.reduce((a, b) => a + b, 0) / moodValues.length) : null;

    let moodDirection = 'Stable';
    if (moodValues.length >= 3) {
        const firstHalf = moodValues.slice(0, Math.floor(moodValues.length / 2));
        const secondHalf = moodValues.slice(Math.floor(moodValues.length / 2));
        const avg1 = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const avg2 = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

        if (avg2 - avg1 > 0.5) moodDirection = 'Improving';
        if (avg1 - avg2 > 0.5) moodDirection = 'Declining';
    }

    // 2. Keyword/Sentiment Analysis (Simple Implementation)
    const keywords = {
        stress: ['busy', 'deadline', 'overwhelmed', 'pressure', 'tight', 'workload', 'tasks', 'rushed'],
        burnout: ['exhausted', 'numb', 'pointless', 'motivation', 'drained', 'tired', 'effort', 'give up'],
        positive: ['happy', 'grateful', 'proud', 'excited', 'good', 'better', 'joy', 'calm', 'peace'],
        anxiety: ['worried', 'scared', 'future', 'uncertain', 'heart', 'panic', 'nervous']
    };

    let counts = { stress: 0, burnout: 0, positive: 0, anxiety: 0 };
    let evidence = { stress: [], burnout: [], positive: [], anxiety: [] };

    journals.forEach(entry => {
        const content = entry.content.toLowerCase();
        Object.keys(keywords).forEach(category => {
            keywords[category].forEach(word => {
                if (content.includes(word)) {
                    counts[category]++;
                    if (!evidence[category].includes(word)) evidence[category].push(word);
                }
            });
        });
    });

    // 3. Synthesize Insights
    let trend = 'Stable';
    let summary = "Your mood seems stable lately.";
    let explainability = "";

    const maxCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

    if (counts[maxCategory] > 0) {
        if (maxCategory === 'stress') {
            trend = 'High Stress';
            summary = "You've been mentioning a lot of pressure lately. Remember to take small breaks.";
            explainability = `Based on your frequent use of words like ${evidence.stress.slice(0, 3).join(', ')}.`;
        } else if (maxCategory === 'burnout') {
            trend = 'Potential Burnout';
            summary = "It sounds like you're feeling quite drained. It might be a good time for some rest.";
            explainability = `You've used words like ${evidence.burnout.slice(0, 3).join(', ')} which often indicate low energy.`;
        } else if (maxCategory === 'positive') {
            trend = 'Positive Trend';
            summary = "You're having a great run! These positive reflections are wonderful.";
            explainability = `You've highlighted feelings of ${evidence.positive.slice(0, 3).join(', ')}.`;
        } else if (maxCategory === 'anxiety') {
            trend = 'Anxious Patterns';
            summary = "There's been a bit of uncertainty in your thoughts recently.";
            explainability = `You've expressed worries related to ${evidence.anxiety.slice(0, 3).join(', ')}.`;
        }
    }

    // Adjust summary if mood is declining despite positive words, or vice-versa
    if (moodDirection === 'Declining' && trend === 'Positive Trend') {
        summary = "Even though you use positive words, your logged mood values have been dipping. Reflection might help.";
    }

    return {
        trend,
        summary,
        explainability,
        topEmotions: Object.keys(counts).filter(cat => counts[cat] > 0),
        moodAverage: avgMood ? avgMood.toFixed(1) : null,
        moodDirection
    };
};

module.exports = { analyzeMoodPatterns };
