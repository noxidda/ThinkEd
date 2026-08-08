const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    title: { type: String, required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true },
        explanation: { type: String },
      },
    ],
    totalScore: { type: Number, default: 0 },
    userScore: { type: Number, default: null },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
