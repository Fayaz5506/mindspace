const express = require('express');
const router = express.Router();
const {
    getPosts,
    createPost,
    reactToPost,
    deletePost,
    flagPost,
    getFlaggedPosts,
    updatePostStatus
} = require('../controllers/communityController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getPosts)
    .post(protect, createPost);

// Moderation routes
router.get('/moderation', protect, authorize('admin'), getFlaggedPosts);
router.put('/:id/status', protect, authorize('admin'), updatePostStatus);
router.put('/:id/flag', protect, flagPost);

router.post('/:id/react', protect, reactToPost);
router.delete('/:id', protect, authorize('admin'), deletePost);

module.exports = router;
