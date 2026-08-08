import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/analytics/overview');
      setStats(data.stats || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-white">Analytics</h1>
        <p className="text-sm text-zinc-500 mt-1">Track your performance and document mastery metrics</p>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500 font-mono">Loading analytics data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-6 space-y-3">
            <h2 className="text-subheading text-white">Study Efficiency</h2>
            <div className="p-4 border border-surface-border bg-surface">
              <p className="text-xs font-mono text-zinc-500">AVERAGE QUIZ SCORE</p>
              <p className="text-2xl font-bold text-white mt-1">
                {stats?.averageScore !== undefined ? `${stats.averageScore}%` : 'N/A'}
              </p>
            </div>
          </div>

          <div className="card p-6 space-y-3">
            <h2 className="text-subheading text-white">Document Processing</h2>
            <div className="p-4 border border-surface-border bg-surface">
              <p className="text-xs font-mono text-zinc-500">TOTAL NOTES UPLOADED</p>
              <p className="text-2xl font-bold text-white mt-1">
                {stats?.totalNotes || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
