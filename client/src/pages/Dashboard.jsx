import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import api from '../services/api';

function StatCard({ label, value, code }) {
  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between border-b border-[#2E1C3F] pb-2">
        <span className="text-[10px] text-[#BDE0FE]/70">{code}</span>
        <span className="text-[10px] text-[#BDE0FE]">METRIC</span>
      </div>
      <p className="text-3xl font-bold text-[#FFC8DD] tracking-tight">{value}</p>
      <p className="text-xs text-[#BDE0FE] uppercase tracking-wider">{label}</p>
    </div>
  );
}

function QuickAction({ to, label, description, code }) {
  return (
    <Link
      to={to}
      className="card hover:border-[#CDB4DB] transition-colors duration-150 flex flex-col justify-between space-y-4"
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] text-[#BDE0FE]/70">{code}</span>
        <span className="text-[10px] text-[#CDB4DB]">OPEN &rarr;</span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white uppercase">{label}</h3>
        <p className="text-xs text-[#BDE0FE]/70 mt-1">{description}</p>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { user } = useUser();
  const [greeting, setGreeting] = useState('');
  const [statsData, setStatsData] = useState({
    totalNotes: 0,
    flashcards: 0,
    quizzesTaken: 0,
    hoursStudied: 0,
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get('/analytics/overview');
      setStatsData(data.stats || { totalNotes: 0, flashcards: 0, quizzesTaken: 0, hoursStudied: 0 });
    } catch (error) {
      setStatsData({ totalNotes: 0, flashcards: 0, quizzesTaken: 0, hoursStudied: 0 });
    }
  };

  const stats = [
    { label: 'Total Notes', value: statsData.totalNotes, code: 'STAT_01' },
    { label: 'Flashcards', value: statsData.flashcards, code: 'STAT_02' },
    { label: 'Quizzes Taken', value: statsData.quizzesTaken, code: 'STAT_03' },
    { label: 'Hours Studied', value: statsData.hoursStudied, code: 'STAT_04' },
  ];

  const quickActions = [
    {
      to: '/notes',
      label: 'Upload Notes',
      description: 'Add new PDF or text study materials',
      code: 'ACT_01',
    },
    {
      to: '/flashcards',
      label: 'Generate Flashcards',
      description: 'Create active recall decks with AI',
      code: 'ACT_02',
    },
    {
      to: '/chat',
      label: 'Chat with Notes',
      description: 'Run semantic vector search queries',
      code: 'ACT_03',
    },
    {
      to: '/quiz',
      label: 'Take a Quiz',
      description: 'Evaluate knowledge with MCQs',
      code: 'ACT_04',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#2E1C3F] pb-6">
        <span className="text-[10px] text-[#BDE0FE]/70 uppercase tracking-widest">
          STUDENT SYSTEM OVERVIEW
        </span>
        <h1 className="text-display text-[#FFC8DD] uppercase mt-1">
          {greeting}, {user?.firstName || 'Student'}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-subheading text-[#FFAFCC] uppercase tracking-wider">
          SYSTEM MODULES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <QuickAction key={index} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
}
