const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true, index: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    status: { type: String, enum: ['new', 'reviewing', 'mastered'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flashcard', flashcardSchema);
