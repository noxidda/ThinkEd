import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col font-sans">
      {/* Navbar */}
      <header className="h-20 border-b border-surface-border flex items-center justify-between px-8 md:px-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black font-mono font-bold text-xs flex items-center justify-center">
            TE
          </div>
          <span className="font-semibold tracking-tight text-sm uppercase">ThinkEd</span>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-ghost font-mono text-xs">LOG IN</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-primary">GET STARTED</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="btn-primary">
              GO TO DASHBOARD &rarr;
            </Link>
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-24 max-w-5xl mx-auto space-y-8">
        <div className="inline-block border border-surface-border px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-400">
          SYSTEM ARCHITECTURE v1.0 &bull; RAG ENGINE
        </div>

        <h1 className="text-display md:text-6xl text-white font-bold tracking-tight max-w-4xl leading-none uppercase">
          THE MINIMALIST AI ASSISTANT FOR SERIOUS LEARNERS.
        </h1>

        <p className="text-zinc-400 max-w-2xl text-base leading-relaxed">
          Upload documents, generate active recall flashcards, synthesize core concepts, and run query RAG chats against your notes with absolute precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="btn-primary px-8 py-4 text-base">START LEARNING FREE</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="btn-primary px-8 py-4 text-base">
              OPEN DASHBOARD
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Grid Features */}
      <section className="border-t border-surface-border grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-surface-border bg-surface-card">
        <div className="p-10 space-y-3">
          <p className="font-mono text-xs text-zinc-500">01 / RAG VECTOR SEARCH</p>
          <h3 className="text-heading text-white uppercase">DOCUMENT QUERY</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Query your uploaded PDFs and notes with citation-backed semantic search powered by embeddings.
          </p>
        </div>

        <div className="p-10 space-y-3">
          <p className="font-mono text-xs text-zinc-500">02 / ACTIVE RECALL</p>
          <h3 className="text-heading text-white uppercase">AI FLASHCARDS</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Auto-generate conceptual question and answer cards for review without manual writing.
          </p>
        </div>

        <div className="p-10 space-y-3">
          <p className="font-mono text-xs text-zinc-500">03 / EVALUATION</p>
          <h3 className="text-heading text-white uppercase">ADAPTIVE QUIZZING</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Evaluate your knowledge retention with instant scoring and explanation breakdowns.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border py-8 px-8 flex justify-between items-center text-xs font-mono text-zinc-600 uppercase">
        <span>THINKED ASSISTANT</span>
        <span>BLACK & WHITE ARCHITECTURE</span>
      </footer>
    </div>
  );
}
