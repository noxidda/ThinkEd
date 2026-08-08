import { useState } from 'react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-20 bg-[#13091B] border-b border-[#2E1C3F] flex items-center justify-between px-8">
      <form onSubmit={(e) => e.preventDefault()} className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, flashcards..."
            className="input py-2 uppercase text-xs tracking-wider"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] text-[#BDE0FE]/70 border border-[#2E1C3F]">
            CTRL+K
          </kbd>
        </div>
      </form>

      <div className="flex items-center gap-2">
        <span className="text-[10px] border border-[#2E1C3F] px-3 py-1.5 text-[#BDE0FE]">
          SYSTEM ACTIVE
        </span>
      </div>
    </header>
  );
}
