const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getStudyPlans, generateStudyPlan } = require('../controllers/studyPlanController');

router.get('/', protect, getStudyPlans);
router.post('/generate', protect, generateStudyPlan);

module.exports = router;
