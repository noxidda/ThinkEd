import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col font-sans antialiased">
      {/* Enterprise Minimal Navbar */}
      <header className="h-20 border-b border-surface-border flex items-center justify-between px-8 md:px-16 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black font-bold text-sm flex items-center justify-center tracking-tighter">
            TE
          </div>
          <span className="font-bold tracking-tight text-base uppercase">ThinkEd</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors duration-150">Features</a>
          <a href="#solutions" className="hover:text-white transition-colors duration-150">Solutions</a>
          <a href="#enterprise" className="hover:text-white transition-colors duration-150">Enterprise</a>
        </nav>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-ghost font-medium text-xs">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-primary px-5 py-2.5">Get Started</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="btn-primary px-5 py-2.5">
              Launch Console &rarr;
            </Link>
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-28 max-w-5xl mx-auto space-y-10">
        <h1 className="text-display md:text-7xl font-bold tracking-tight max-w-4xl leading-none text-white">
          THE MINIMALIST AI ASSISTANT FOR SERIOUS LEARNERS.
        </h1>

        <p className="text-zinc-400 max-w-2xl text-lg md:text-xl leading-relaxed font-normal">
          Accelerate comprehension with enterprise-grade document intelligence, retrieval-augmented queries, and automated study workflows built for rigorous academic and professional research.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="btn-primary px-9 py-4 text-base tracking-normal">
                Start Learning
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="btn-primary px-9 py-4 text-base tracking-normal">
              Open Dashboard
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Enterprise Professional Footer */}
      <footer className="border-t border-surface-border bg-surface-card py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-xs text-zinc-400">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white text-black font-bold text-xs flex items-center justify-center">
                TE
              </div>
              <span className="font-bold text-white uppercase text-sm">ThinkEd</span>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              Intelligent study systems engineered for high-performance research and active knowledge synthesis.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors duration-150">Document Intelligence</a></li>
              <li><a href="#features" className="hover:text-white transition-colors duration-150">RAG Semantic Search</a></li>
              <li><a href="#features" className="hover:text-white transition-colors duration-150">Active Recall Engine</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#solutions" className="hover:text-white transition-colors duration-150">Documentation</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors duration-150">API Reference</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors duration-150">Security & Compliance</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2">
              <li><a href="#enterprise" className="hover:text-white transition-colors duration-150">About ThinkEd</a></li>
              <li><a href="#enterprise" className="hover:text-white transition-colors duration-150">Privacy Policy</a></li>
              <li><a href="#enterprise" className="hover:text-white transition-colors duration-150">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-surface-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-zinc-500 text-[11px]">
          <p>&copy; {new Date().getFullYear()} ThinkEd Technologies Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for extreme focus and productivity.</p>
        </div>
      </footer>
    </div>
  );
}
