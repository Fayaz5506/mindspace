const CommunityPost = require('../models/CommunityPost');
const Report = require('../models/Report');
const moderationService = require('../services/moderationService');

// @desc    Get all active community posts
// @route   GET /api/community
// @access  Private
const getPosts = async (req, res) => {
    try {
        // Only show approved posts to users
        const posts = await CommunityPost.find({ status: 'approved' })
            .sort({ createdAt: -1 })
            .populate('user', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a community post with automated moderation
// @route   POST /api/community
// @access  Private
const createPost = async (req, res) => {
    try {
        const { content, isAnonymous } = req.body;

        // Use moderation service for crisis and safety checks
        const moderation = moderationService.moderateContent(content);

        const post = await CommunityPost.create({
            user: req.user.id,
            content,
            isAnonymous,
            status: moderation.status,
            flagReason: moderation.flagReason,
            needsUrgentReview: moderation.needsUrgentReview,
            isFlagged: moderation.status === 'flagged'
        });

        // Trigger automatic report for Admin review if flagged
        if (moderation.status === 'flagged') {
            await Report.create({
                reporter: req.user.id,
                targetType: 'CommunityPost',
                targetId: post._id,
                reason: moderation.isCrisis ? 'Self-Harm' : 'Inappropriate Content',
                description: `SYSTEM_AUDIT: ${moderation.flagReason}`,
                status: 'Pending'
            });
        }

        res.status(201).json({
            post,
            moderationAlert: moderation.status === 'flagged' ? 'Your post is under review for safety reasons.' : null,
            crisisAlert: moderation.isCrisis ? 'A crisis alert was triggered. Please reach out to emergency services or a helpline.' : null
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Manually flag a post by a user
// @route   PUT /api/community/:id/flag
// @access  Private
const flagPost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.status = 'flagged';
        post.isFlagged = true;
        post.flagReason = `User Flagged: ${req.body.reason || 'No reason provided'}`;
        await post.save();

        res.json({ message: 'Post flagged for review' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all flagged/pending posts for moderation (Admin only)
// @route   GET /api/community/moderation
// @access  Private/Admin
const getFlaggedPosts = async (req, res) => {
    try {
        // In a real app, check if req.user.role === 'admin'
        const posts = await CommunityPost.find({
            status: { $in: ['flagged', 'pending'] }
        }).sort({ needsUrgentReview: -1, createdAt: -1 })
            .populate('user', 'username');

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update post status (Approve/Reject) (Admin only)
// @route   PUT /api/community/:id/status
// @access  Private/Admin
const updatePostStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.status = status;
        if (status === 'approved') {
            post.isFlagged = false;
        }
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const reactToPost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.reactions.push(req.body.reaction);
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPosts,
    createPost,
    flagPost,
    getFlaggedPosts,
    updatePostStatus,
    reactToPost,
    deletePost
};
