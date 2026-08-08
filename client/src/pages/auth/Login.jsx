import { SignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="h-20 border-b border-zinc-700 flex items-center justify-between px-8 md:px-16 bg-zinc-950">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black font-bold text-sm flex items-center justify-center tracking-tighter">
            TE
          </div>
          <span className="font-bold tracking-tight text-base uppercase text-white">ThinkEd</span>
        </Link>
        <Link to="/register" className="btn-ghost text-xs text-zinc-300 hover:text-white">
          Need an account? Sign Up &rarr;
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-md card p-8 border border-zinc-700 bg-zinc-950 flex flex-col items-center shadow-xl">
          <div className="text-center mb-6 w-full">
            <h1 className="text-heading text-white uppercase font-bold tracking-tight text-xl">
              Sign In to ThinkEd
            </h1>
          </div>

          {/* Embedded Clerk SignIn component */}
          <div className="w-full flex justify-center">
            <SignIn
              path="/login"
              routing="path"
              signUpUrl="/register"
              fallbackRedirectUrl="/dashboard"
              appearance={{
                baseTheme: dark,
                variables: {
                  colorPrimary: '#ffffff',
                  colorBackground: '#09090b',
                  colorText: '#ffffff',
                  colorTextSecondary: '#d4d4d8',
                  colorInputBackground: '#000000',
                  colorInputText: '#ffffff',
                  borderRadius: '0px',
                  fontFamily: 'DM Sans, sans-serif',
                },
                elements: {
                  rootBox: 'w-full',
                  cardBox: 'w-full shadow-none',
                  card: 'bg-zinc-950 border border-zinc-700 p-6 shadow-none w-full rounded-none',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton:
                    'bg-black border border-zinc-700 text-white hover:bg-zinc-900 transition-colors text-xs font-semibold rounded-none py-2.5 w-full justify-center',
                  socialButtonsBlockButtonText: 'text-white font-medium text-xs',
                  dividerLine: 'bg-zinc-700',
                  dividerText: 'text-zinc-400 text-[10px] uppercase font-mono',
                  formFieldLabel: 'text-zinc-300 font-semibold text-xs uppercase tracking-wider',
                  formFieldInput:
                    'bg-black border border-zinc-700 text-white text-sm focus:border-white transition-colors rounded-none px-4 py-2.5 w-full',
                  formButtonPrimary:
                    'bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors rounded-none py-3 w-full',
                  footerActionLink: 'text-white hover:underline text-xs',
                  footer: 'hidden',
                },
              }}
            />
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-700 py-6 text-center text-xs text-zinc-400 font-mono uppercase bg-zinc-950">
        &copy; {new Date().getFullYear()} ThinkEd Technologies Inc.
      </footer>
    </div>
  );
}
