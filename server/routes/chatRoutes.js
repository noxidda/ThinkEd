const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { queryRAG } = require('../controllers/chatController');

router.post('/query', protect, queryRAG);

module.exports = router;
