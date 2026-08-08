import { SignUp } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
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
        <div className="w-full max-w-md card p-8 border border-surface-border bg-surface-card flex flex-col items-center">
          <div className="text-center space-y-2 mb-6 w-full">
            <h1 className="text-heading text-white uppercase font-bold tracking-tight">
              Create your account
            </h1>
            <p className="text-xs text-zinc-400">
              Join ThinkEd to access automated document summaries and active recall
            </p>
          </div>

          {/* Embedded Clerk SignUp component without path routing mismatch */}
          <div className="w-full flex justify-center">
            <SignUp
              path="/register"
              routing="path"
              signInUrl="/login"
              fallbackRedirectUrl="/dashboard"
              appearance={{
                baseTheme: dark,
                variables: {
                  colorPrimary: '#ffffff',
                  colorBackground: '#000000',
                  colorText: '#ffffff',
                  colorTextSecondary: '#a1a1aa',
                  colorInputBackground: '#000000',
                  colorInputText: '#ffffff',
                  borderRadius: '0px',
                  fontFamily: 'DM Sans, sans-serif',
                },
                elements: {
                  rootBox: 'w-full',
                  cardBox: 'w-full shadow-none',
                  card: 'bg-black border border-zinc-800 p-6 shadow-none w-full rounded-none',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton:
                    'bg-black border border-zinc-800 text-white hover:bg-zinc-900 transition-colors text-xs font-semibold rounded-none py-2.5 w-full justify-center',
                  socialButtonsBlockButtonText: 'text-white font-medium text-xs',
                  dividerLine: 'bg-zinc-800',
                  dividerText: 'text-zinc-500 text-[10px] uppercase font-mono',
                  formFieldLabel: 'text-zinc-400 font-medium text-xs uppercase tracking-wider',
                  formFieldInput:
                    'bg-black border border-zinc-800 text-white text-sm focus:border-white transition-colors rounded-none px-4 py-2.5 w-full',
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
