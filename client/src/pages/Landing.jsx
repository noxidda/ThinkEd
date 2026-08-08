import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#13091B] text-white selection:bg-[#CDB4DB] selection:text-[#13091B] flex flex-col font-sans antialiased">
      {/* Enterprise Minimal Navbar */}
      <header className="h-20 border-b border-[#2E1C3F] flex items-center justify-between px-8 md:px-16 bg-[#13091B]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#CDB4DB] text-[#13091B] font-bold text-sm flex items-center justify-center tracking-tighter">
            TE
          </div>
          <span className="font-bold tracking-tight text-base uppercase text-[#FFC8DD]">ThinkEd</span>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <Link to="/login" className="btn-ghost font-medium text-xs">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary px-5 py-2.5">
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="btn-primary px-5 py-2.5">
              Launch Console &rarr;
            </Link>
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-28 max-w-5xl mx-auto space-y-8">
        <h1 className="text-display md:text-6xl font-bold tracking-tight max-w-3xl leading-tight text-[#FFC8DD]">
          Your Personal AI Study Assistant
        </h1>

        <p className="text-[#BDE0FE]/80 max-w-lg text-sm md:text-base leading-relaxed font-normal">
          Upload your study notes, generate instant flashcards, practice with quizzes, and chat directly with your documents.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <SignedOut>
            <Link to="/register" className="btn-primary px-8 py-3.5 text-sm tracking-normal">
              Start Learning
            </Link>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="btn-primary px-8 py-3.5 text-sm tracking-normal">
              Open Dashboard
            </Link>
          </SignedIn>

          {/* Download Windows Button */}
          <a
            href="#download-windows"
            className="btn-secondary px-8 py-3.5 text-sm tracking-normal flex items-center justify-center gap-2.5 bg-[#1C1027] border border-[#A2D2FF]/40 text-[#A2D2FF] hover:bg-[#261635] hover:border-[#A2D2FF] transition-all duration-200"
          >
            <svg
              className="w-4 h-4 fill-current text-[#A2D2FF]"
              viewBox="0 0 88 88"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.527l.028 34.453L0 75.48V46.102zM39.77 6.94L87.31 0v41.522l-47.54.407zm47.54 39.117V88L39.77 81.28V46.425z" />
            </svg>
            <span>Download for Windows</span>
          </a>
        </div>
      </section>

      {/* Enterprise Professional Footer */}
      <footer className="border-t border-[#2E1C3F] bg-[#1C1027] py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-xs text-[#BDE0FE]/80">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#CDB4DB] text-[#13091B] font-bold text-xs flex items-center justify-center">
                TE
              </div>
              <span className="font-bold text-[#FFC8DD] uppercase text-sm">ThinkEd</span>
            </div>
            <p className="text-[#BDE0FE]/60 leading-relaxed">
              Intelligent study systems engineered for high-performance research and active knowledge synthesis.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#FFAFCC] uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors duration-150">Document Intelligence</a></li>
              <li><a href="#features" className="hover:text-white transition-colors duration-150">RAG Semantic Search</a></li>
              <li><a href="#features" className="hover:text-white transition-colors duration-150">Active Recall Engine</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#FFAFCC] uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#solutions" className="hover:text-white transition-colors duration-150">Documentation</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors duration-150">API Reference</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors duration-150">Security & Compliance</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#FFAFCC] uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2">
              <li><a href="#enterprise" className="hover:text-white transition-colors duration-150">About ThinkEd</a></li>
              <li><a href="#enterprise" className="hover:text-white transition-colors duration-150">Privacy Policy</a></li>
              <li><a href="#enterprise" className="hover:text-white transition-colors duration-150">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-[#2E1C3F] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[#BDE0FE]/50 text-[11px]">
          <p>&copy; {new Date().getFullYear()} ThinkEd Technologies Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for extreme focus and productivity.</p>
        </div>
      </footer>
    </div>
  );
}
