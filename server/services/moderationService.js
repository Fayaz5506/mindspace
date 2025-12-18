/**
 * Moderation Service for MindSpace
 * Handles safety rules, content flagging, and crisis keyword detection.
 */

const CRISIS_KEYWORDS = [
    'suicide', 'kill myself', 'self-harm', 'hurt myself', 'end it all',
    'hopeless', 'giving up', 'overdose', 'cut myself', 'jumping off'
];

const BANNED_KEYWORDS = [
    'hate', 'idiot', 'stupid', 'curse', 'badword1', 'badword2' // Placeholders
];

/**
 * Checks content for crisis keywords.
 * Returns information if a crisis is detected.
 */
const detectCrisis = (content) => {
    const lowerContent = content.toLowerCase();
    const specificKeywords = CRISIS_KEYWORDS.filter(word => lowerContent.includes(word));

    if (specificKeywords.length > 0) {
        return {
            isCrisis: true,
            keywords: specificKeywords,
            message: "Content contains crisis-related keywords. Immediate intervention recommendation: Provide helpline information."
        };
    }
    return { isCrisis: false };
};

/**
 * Checks content for prohibited language or toxicity.
 * Returns true if the content should be flagged.
 */
const checkSafety = (content) => {
    const lowerContent = content.toLowerCase();

    // Check for banned words
    const hasBannedContent = BANNED_KEYWORDS.some(word => lowerContent.includes(word));

    // Simulated toxicity check (e.g., all caps might indicate shouting/aggression)
    const isShouting = content.length > 20 && content === content.toUpperCase();

    return {
        flagged: hasBannedContent || isShouting,
        reason: hasBannedContent ? "Prohibited language detected" : (isShouting ? "Potential aggressive behavior (shouting)" : "Safe")
    };
};

/**
 * Main moderation logic used before a post is saved.
 */
const moderateContent = (content) => {
    const crisisInfo = detectCrisis(content);
    const safetyInfo = checkSafety(content);

    let status = 'approved';
    let flagReason = null;
    let needsUrgentReview = false;

    if (crisisInfo.isCrisis) {
        status = 'flagged';
        flagReason = `CRISIS_DETECTED: ${crisisInfo.keywords.join(', ')}`;
        needsUrgentReview = true;
    } else if (safetyInfo.flagged) {
        status = 'flagged';
        flagReason = safetyInfo.reason;
    }

    return {
        status,
        flagReason,
        needsUrgentReview,
        isCrisis: crisisInfo.isCrisis
    };
};

module.exports = { moderateContent, detectCrisis };
