const Note = require('../models/Note');
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');

exports.getOverview = async (req, res) => {
  try {
    const totalNotes = await Note.countDocuments({ userId: req.user.id });
    const flashcards = await Flashcard.countDocuments({ userId: req.user.id });
    const quizzesTaken = await Quiz.countDocuments({ userId: req.user.id, completedAt: { $ne: null } });

    const completedQuizzes = await Quiz.find({ userId: req.user.id, completedAt: { $ne: null } });
    let averageScore = 0;
    if (completedQuizzes.length > 0) {
      const sum = completedQuizzes.reduce((acc, q) => acc + (q.userScore || 0), 0);
      averageScore = Math.round(sum / completedQuizzes.length);
    }

    res.json({
      stats: {
        totalNotes,
        flashcards,
        quizzesTaken,
        hoursStudied: (totalNotes * 1.5).toFixed(1),
        averageScore,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating analytics' });
  }
};
