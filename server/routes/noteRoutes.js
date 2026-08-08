const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const {
  getNotes,
  getNoteById,
  uploadNote,
  summarizeNote,
} = require('../controllers/noteController');

router.get('/', protect, getNotes);
router.get('/:id', protect, getNoteById);
router.post('/upload', protect, upload.single('file'), uploadNote);
router.post('/:id/summarize', protect, summarizeNote);

module.exports = router;
