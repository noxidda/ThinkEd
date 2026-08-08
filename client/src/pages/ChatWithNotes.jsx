import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ChatWithNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');
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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    const currentQuery = query;
    setQuery('');
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/chat/query', {
        noteId: selectedNoteId || undefined,
        question: currentQuery,
      });

      const assistantMessage = {
        role: 'assistant',
        content: data.answer,
        citations: data.citations || [],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get answer from AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div>
        <h1 className="text-display text-white">Chat with Notes (RAG)</h1>
        <p className="text-sm text-zinc-500 mt-1">Ask questions and get answers cited directly from your documents</p>
      </div>

      {/* Target Selector */}
      <div className="card p-4 flex items-center gap-4">
        <label className="text-xs font-mono text-zinc-400">SCOPE:</label>
        <select
          value={selectedNoteId}
          onChange={(e) => setSelectedNoteId(e.target.value)}
          className="input text-xs py-1.5"
        >
          <option value="">All Notes (Global Context)</option>
          {notes.map((n) => (
            <option key={n._id} value={n._id}>
              {n.title}
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 card p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <p className="text-sm text-zinc-500 font-mono text-center my-8">
            Ask any question to search your documents.
          </p>
        ) : (
          messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 border text-sm ${
                m.role === 'user'
                  ? 'border-brand-purple/30 bg-brand-purple/5 text-white ml-12'
                  : 'border-surface-border bg-surface text-zinc-300 mr-12'
              }`}
            >
              <div className="text-xs font-mono text-zinc-500 mb-1">
                {m.role === 'user' ? 'YOU' : 'THINKED RAG AI'}
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
              {m.citations && m.citations.length > 0 && (
                <div className="mt-3 pt-2 border-t border-surface-border text-xs font-mono text-zinc-500">
                  CITATIONS: {m.citations.join(', ')}
                </div>
              )}
            </div>
          ))
        )}
        {loading && (
          <p className="text-xs font-mono text-zinc-500 animate-pulse">
            SEARCHING VECTORS & GENERATING RESPONSE...
          </p>
        )}
        {error && (
          <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about your study materials..."
          className="input flex-1"
        />
        <button type="submit" disabled={loading || !query.trim()} className="btn-primary">
          SEND
        </button>
      </form>
    </div>
  );
}
