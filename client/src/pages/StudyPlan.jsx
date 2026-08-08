import { useState, useEffect } from 'react';
import api from '../services/api';

export default function StudyPlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [goal, setGoal] = useState('');
  const [examDate, setExamDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudyPlans();
  }, []);

  const fetchStudyPlans = async () => {
    try {
      const { data } = await api.get('/study-plan');
      setPlans(data.plans || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch study plans');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!goal) return;
    setGenerating(true);
    setError('');

    try {
      await api.post('/study-plan/generate', { goal, examDate });
      setGoal('');
      setExamDate('');
      fetchStudyPlans();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate study plan');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-white">AI Study Plan</h1>
        <p className="text-sm text-zinc-500 mt-1">Generate dynamic study schedules tailored to your goals</p>
      </div>

      {/* Generator */}
      <form onSubmit={handleGenerate} className="card p-6 space-y-4">
        <h2 className="text-subheading text-white">Create New Schedule</h2>
        {error && (
          <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Study Goal / Subject</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Master Algorithms by Friday"
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Target Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="input"
            />
          </div>
        </div>
        <button type="submit" disabled={generating} className="btn-primary">
          {generating ? 'GENERATING PLAN...' : 'GENERATE PLAN'}
        </button>
      </form>

      {/* Plans List */}
      <div className="space-y-4">
        <h2 className="text-subheading text-white">Active Plans</h2>
        {loading ? (
          <p className="text-sm text-zinc-500 font-mono">Loading plans...</p>
        ) : plans.length === 0 ? (
          <p className="text-sm text-zinc-500 font-mono">No study plans created yet.</p>
        ) : (
          plans.map((p) => (
            <div key={p._id} className="card p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">{p.goal}</h3>
              <p className="text-xs text-zinc-500 font-mono">
                TARGET DATE: {p.examDate ? new Date(p.examDate).toLocaleDateString() : 'N/A'}
              </p>
              <div className="space-y-2">
                {p.scheduleItems?.map((item, idx) => (
                  <div key={idx} className="p-3 border border-surface-border flex justify-between text-xs">
                    <span className="text-white font-medium">{item.task}</span>
                    <span className="font-mono text-zinc-500">{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
