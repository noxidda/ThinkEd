const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth');
const {
  getNotes,
  getNoteById,
  uploadNote,
  summarizeNote,
} = require('../controllers/noteController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.get('/', protect, getNotes);
router.get('/:id', protect, getNoteById);
router.post('/upload', protect, upload.single('file'), uploadNote);
router.post('/:id/summarize', protect, summarizeNote);

module.exports = router;
