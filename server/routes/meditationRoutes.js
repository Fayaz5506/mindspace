const express = require('express');
const router = express.Router();
const { getMeditations, createMeditation } = require('../controllers/meditationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getMeditations)
    .post(protect, authorize('admin'), createMeditation);

module.exports = router;
