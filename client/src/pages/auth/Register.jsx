import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="h-20 border-b border-surface-border flex items-center justify-between px-8 md:px-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black font-bold text-sm flex items-center justify-center tracking-tighter">
            TE
          </div>
          <span className="font-bold tracking-tight text-base uppercase">ThinkEd</span>
        </Link>
        <Link to="/login" className="btn-ghost text-xs">
          Already have an account? Sign In &rarr;
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-md card p-8 space-y-6 border border-surface-border bg-surface-card">
          <div className="text-center space-y-2">
            <h1 className="text-heading text-white uppercase font-bold tracking-tight">
              Create your account
            </h1>
            <p className="text-xs text-zinc-400">
              Join ThinkEd to access automated document summaries and active recall
            </p>
          </div>

          {/* Custom Styled Clerk Component */}
          <div className="flex justify-center clerk-custom-wrapper">
            <SignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              afterSignUpUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'bg-black border border-surface-border p-0 shadow-none w-full',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton:
                    'bg-black border border-surface-border text-white hover:bg-zinc-900 transition-colors text-xs font-semibold rounded-none py-2.5',
                  socialButtonsBlockButtonText: 'text-white font-medium text-xs',
                  dividerLine: 'bg-zinc-800',
                  dividerText: 'text-zinc-500 font-mono text-[10px] uppercase',
                  formFieldLabel: 'text-zinc-400 font-medium text-xs uppercase tracking-wider',
                  formFieldInput:
                    'bg-black border border-surface-border text-white text-sm focus:border-white transition-colors rounded-none px-4 py-2.5',
                  formButtonPrimary:
                    'bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors rounded-none py-3 w-full',
                  footerActionLink: 'text-white hover:underline text-xs',
                  footer: 'hidden',
                },
              }}
            />
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-surface-border py-6 text-center text-xs text-zinc-500 font-mono uppercase">
        &copy; {new Date().getFullYear()} ThinkEd Technologies Inc.
      </footer>
    </div>
  );
}
