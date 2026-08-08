import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFlashcards();
    fetchNotes();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const { data } = await api.get('/flashcards');
      setFlashcards(data.flashcards || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch flashcards');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/notes');
      setNotes(data.notes || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async () => {
    if (!selectedNoteId) {
      setError('Please select a note to generate flashcards');
      return;
    }
    setGenerating(true);
    setError('');

    try {
      await api.post('/flashcards/generate', { noteId: selectedNoteId, count: 10 });
      fetchFlashcards();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate flashcards');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-white">Flashcards</h1>
        <p className="text-sm text-zinc-500 mt-1">Review AI-generated flashcards for active recall</p>
      </div>

      {/* Generator Box */}
      <div className="card p-6 space-y-4">
        <h2 className="text-subheading text-white">Generate Flashcards</h2>
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
            onClick={handleGenerate}
            disabled={generating || !selectedNoteId}
            className="btn-primary"
          >
            {generating ? 'GENERATING...' : 'GENERATE'}
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        <h2 className="text-subheading text-white">Your Flashcard Decks</h2>
        {loading ? (
          <p className="text-sm text-zinc-500 font-mono">Loading flashcards...</p>
        ) : flashcards.length === 0 ? (
          <p className="text-sm text-zinc-500 font-mono">No flashcards generated yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcards.map((card, idx) => (
              <div
                key={card._id || idx}
                onClick={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
                className="card p-6 min-h-[160px] flex flex-col justify-between cursor-pointer hover:border-brand-purple transition-colors"
              >
                <div className="flex justify-between text-xs font-mono text-zinc-500">
                  <span>CARD #{idx + 1}</span>
                  <span>{flippedIndex === idx ? 'ANSWER' : 'QUESTION'}</span>
                </div>
                <p className="text-sm text-white font-medium my-4">
                  {flippedIndex === idx ? card.answer : card.question}
                </p>
                <p className="text-xs font-mono text-zinc-500 text-right">
                  CLICK TO FLIP
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
