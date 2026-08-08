const Quiz = require('../models/Quiz');
const Note = require('../models/Note');

exports.generateQuiz = async (req, res) => {
  try {
    const { noteId } = req.body;
    const note = await Note.findOne({ _id: noteId, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const quiz = await Quiz.create({
      userId: req.user.id,
      noteId: note._id,
      title: `Quiz: ${note.title}`,
      questions: [
        {
          questionText: `What is the principal topic analyzed in ${note.title}?`,
          options: [
            'Core theoretical principles',
            'Legacy data formats',
            'Unrelated external processes',
            'Static manual records',
          ],
          correctAnswer: 0,
          explanation: 'The document primarily explores core theoretical principles.',
        },
        {
          questionText: 'Which methodology ensures data consistency during processing?',
          options: [
            'Manual verification',
            'Automated vector validation',
            'Random sampling',
            'No verification',
          ],
          correctAnswer: 1,
          explanation: 'Automated vector validation guarantees data integrity.',
        },
      ],
    });

    res.status(201).json({ quiz });
  } catch (error) {
    res.status(500).json({ message: 'Error generating quiz' });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findOne({ _id: req.params.id, userId: req.user.id });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);
    quiz.userScore = scorePercentage;
    quiz.completedAt = new Date();
    await quiz.save();

    res.json({ score: scorePercentage, quiz });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz' });
  }
};
