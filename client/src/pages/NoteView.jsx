import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      const { data } = await api.get(`/notes/${id}`);
      setNote(data.note);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch note details');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async (length = 'medium') => {
    setGeneratingSummary(true);
    try {
      const { data } = await api.post(`/notes/${id}/summarize`, { length });
      setNote((prev) => ({ ...prev, summary: data.summary }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate summary');
    } finally {
      setGeneratingSummary(false);
    }
  };

  if (loading) return <p className="text-sm text-zinc-500 font-mono">Loading note details...</p>;
  if (error) return <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-sm">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-white">{note?.title}</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Subject: {note?.subject || 'General'} • File: {note?.fileName}
        </p>
      </div>

      {/* AI Summaries */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-subheading text-white">AI Summary</h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleGenerateSummary('short')}
              disabled={generatingSummary}
              className="px-3 py-1 text-xs font-mono border border-surface-border text-zinc-300 hover:border-brand-purple"
            >
              SHORT
            </button>
            <button
              onClick={() => handleGenerateSummary('medium')}
              disabled={generatingSummary}
              className="px-3 py-1 text-xs font-mono border border-surface-border text-zinc-300 hover:border-brand-purple"
            >
              MEDIUM
            </button>
            <button
              onClick={() => handleGenerateSummary('detailed')}
              disabled={generatingSummary}
              className="px-3 py-1 text-xs font-mono border border-surface-border text-zinc-300 hover:border-brand-purple"
            >
              DETAILED
            </button>
          </div>
        </div>

        {generatingSummary ? (
          <p className="text-sm text-zinc-500 font-mono">Generating AI summary with Gemini 2.5 Pro...</p>
        ) : note?.summary?.medium || note?.summary?.short || note?.summary?.detailed ? (
          <div className="p-4 bg-surface border border-surface-border text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
            {note.summary.medium || note.summary.short || note.summary.detailed}
          </div>
        ) : (
          <p className="text-sm text-zinc-500 font-mono">No summary generated yet. Click a length option above to generate.</p>
        )}
      </div>

      {/* Extracted Text */}
      <div className="card p-6 space-y-4">
        <h2 className="text-subheading text-white">Extracted Document Text</h2>
        <div className="p-4 bg-surface border border-surface-border text-xs font-mono text-zinc-400 max-h-96 overflow-y-auto whitespace-pre-wrap">
          {note?.extractedText || 'No extracted text available.'}
        </div>
      </div>
    </div>
  );
}
