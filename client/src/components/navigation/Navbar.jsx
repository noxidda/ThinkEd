import { useState } from 'react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-20 bg-black border-b border-surface-border flex items-center justify-between px-8">
      <form onSubmit={(e) => e.preventDefault()} className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, flashcards..."
            className="input py-2 uppercase text-xs tracking-wider"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] text-zinc-500 border border-surface-border font-mono">
            CTRL+K
          </kbd>
        </div>
      </form>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono border border-surface-border px-3 py-1.5 text-zinc-400">
          SYSTEM ACTIVE
        </span>
      </div>
    </header>
  );
}
