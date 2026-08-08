const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    goal: { type: String, required: true },
    examDate: { type: Date },
    scheduleItems: [
      {
        task: { type: String, required: true },
        duration: { type: String, required: true },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
