const StudyPlan = require('../models/StudyPlan');

exports.getStudyPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching study plans' });
  }
};

exports.generateStudyPlan = async (req, res) => {
  try {
    const { goal, examDate } = req.body;

    const plan = await StudyPlan.create({
      userId: req.user.id,
      goal,
      examDate: examDate || null,
      scheduleItems: [
        { task: 'Read uploaded note summaries', duration: '45 mins' },
        { task: 'Review active flashcards deck', duration: '30 mins' },
        { task: 'Complete practice evaluation quiz', duration: '20 mins' },
      ],
    });

    res.status(201).json({ plan });
  } catch (error) {
    res.status(500).json({ message: 'Error generating study plan' });
  }
};
