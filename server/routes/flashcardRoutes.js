const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getFlashcards, generateFlashcards } = require('../controllers/flashcardController');

router.get('/', protect, getFlashcards);
router.post('/generate', protect, generateFlashcards);

module.exports = router;
