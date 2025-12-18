const express = require('express');
const router = express.Router();
const { getUserInsights } = require('../controllers/insightController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getUserInsights);

module.exports = router;
