import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/notes');
      setNotes(data.notes || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError('Title and File are required');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('file', file);

    try {
      await api.post('/notes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTitle('');
      setSubject('');
      setFile(null);
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-white">Notes Library</h1>
          <p className="text-sm text-zinc-500 mt-1">Upload and manage your study documents</p>
        </div>
      </div>

      {/* Upload Box */}
      <form onSubmit={handleUpload} className="card p-6 space-y-4">
        <h2 className="text-subheading text-white">Upload New Document</h2>
        {error && (
          <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="e.g. Data Structures Chapter 1"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Subject (Optional)</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input"
              placeholder="e.g. Computer Science"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">File (PDF, Image, Text)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="input file:bg-surface-border file:text-white file:border-none file:px-3 file:py-1 file:mr-4 font-mono text-xs"
            accept=".pdf,.png,.jpg,.jpeg,.txt"
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="btn-primary flex items-center justify-center gap-2"
        >
          {uploading ? 'UPLOADING & PROCESSING...' : 'UPLOAD NOTE'}
        </button>
      </form>

      {/* Notes List */}
      <div className="card p-6 space-y-4">
        <h2 className="text-subheading text-white">Your Notes</h2>
        {loading ? (
          <p className="text-sm text-zinc-500 font-mono">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-sm text-zinc-500 font-mono">No notes uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="p-4 border border-surface-border flex items-center justify-between hover:border-brand-lavender/30 transition-colors"
              >
                <div>
                  <h3 className="text-sm font-medium text-white">{note.title}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Subject: {note.subject || 'General'} • Type: {note.fileType?.toUpperCase()} • Status: {note.status}
                  </p>
                </div>
                <a
                  href={`/notes/${note._id}`}
                  className="px-3 py-1.5 border border-surface-border text-xs font-mono text-zinc-300 hover:text-white hover:border-brand-lavender"
                >
                  VIEW
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
