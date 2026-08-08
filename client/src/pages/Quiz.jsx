import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Quiz() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/notes');
      setNotes(data.notes || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!selectedNoteId) {
      setError('Select a note to generate a quiz');
      return;
    }
    setLoading(true);
    setError('');
    setQuiz(null);
    setUserAnswers({});
    setScore(null);

    try {
      const { data } = await api.post('/quizzes/generate', {
        noteId: selectedNoteId,
        questionCount: 5,
        difficulty: 'medium',
      });
      setQuiz(data.quiz);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionIdx, optionIdx) => {
    setUserAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    try {
      const { data } = await api.post(`/quizzes/${quiz._id}/submit`, {
        answers: userAnswers,
      });
      setScore(data.score);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit quiz');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-white">Interactive Quiz</h1>
        <p className="text-sm text-zinc-500 mt-1">Test your document knowledge with AI-generated MCQs</p>
      </div>

      {/* Generator */}
      <div className="card p-6 space-y-4">
        <h2 className="text-subheading text-white">Generate Quiz</h2>
        {error && (
          <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
            {error}
          </div>
        )}
        <div className="flex gap-4">
          <select
            value={selectedNoteId}
            onChange={(e) => setSelectedNoteId(e.target.value)}
            className="input flex-1"
          >
            <option value="">Select a note...</option>
            {notes.map((note) => (
              <option key={note._id} value={note._id}>
                {note.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleGenerateQuiz}
            disabled={loading || !selectedNoteId}
            className="btn-primary"
          >
            {loading ? 'GENERATING...' : 'START QUIZ'}
          </button>
        </div>
      </div>

      {/* Quiz Body */}
      {quiz && (
        <div className="card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-surface-border pb-4">
            <h2 className="text-subheading text-white">{quiz.title}</h2>
            {score !== null && (
              <span className="text-xs font-mono px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400">
                SCORE: {score}%
              </span>
            )}
          </div>

          <div className="space-y-6">
            {quiz.questions.map((q, qIdx) => (
              <div key={qIdx} className="space-y-3 p-4 border border-surface-border">
                <p className="text-sm font-medium text-white">
                  Q{qIdx + 1}. {q.questionText}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full text-left p-3 text-sm border transition-colors ${
                        userAnswers[qIdx] === optIdx
                          ? 'border-brand-purple bg-brand-purple/10 text-white'
                          : 'border-surface-border hover:bg-surface-hover text-zinc-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {score === null && (
            <button onClick={handleSubmitQuiz} className="btn-primary w-full">
              SUBMIT QUIZ
            </button>
          )}
        </div>
      )}
    </div>
  );
}
