import { SignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#13091B] text-white flex flex-col justify-between font-sans selection:bg-[#CDB4DB] selection:text-[#13091B]">
      {/* Header */}
      <header className="h-20 border-b border-[#2E1C3F] flex items-center justify-between px-8 md:px-16 bg-[#1C1027]">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#CDB4DB] text-[#13091B] font-bold text-sm flex items-center justify-center tracking-tighter">
            TE
          </div>
          <span className="font-bold tracking-tight text-base uppercase text-[#FFC8DD]">ThinkEd</span>
        </Link>
        <Link to="/register" className="btn-ghost text-xs text-[#BDE0FE] hover:text-[#FFAFCC]">
          Need an account? Sign Up &rarr;
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-md card p-8 border border-[#2E1C3F] bg-[#1C1027] flex flex-col items-center shadow-xl">
          <div className="text-center mb-6 w-full">
            <h1 className="text-heading text-[#FFC8DD] uppercase font-bold tracking-tight text-xl">
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
                  colorPrimary: '#CDB4DB',
                  colorBackground: '#1C1027',
                  colorText: '#ffffff',
                  colorTextSecondary: '#BDE0FE',
                  colorInputBackground: '#13091B',
                  colorInputText: '#ffffff',
                  borderRadius: '0px',
                  fontFamily: 'DM Sans, sans-serif',
                },
                elements: {
                  rootBox: 'w-full',
                  cardBox: 'w-full shadow-none',
                  card: 'bg-[#1C1027] border border-[#2E1C3F] p-6 shadow-none w-full rounded-none',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton:
                    'bg-[#13091B] border border-[#2E1C3F] text-[#BDE0FE] hover:bg-[#261635] transition-colors text-xs font-semibold rounded-none py-2.5 w-full justify-center',
                  socialButtonsBlockButtonText: 'text-[#BDE0FE] font-medium text-xs',
                  dividerLine: 'bg-[#2E1C3F]',
                  dividerText: 'text-[#BDE0FE] text-[10px] uppercase font-mono',
                  formFieldLabel: 'text-[#BDE0FE] font-semibold text-xs uppercase tracking-wider',
                  formFieldInput:
                    'bg-[#13091B] border border-[#2E1C3F] text-white text-sm focus:border-[#CDB4DB] transition-colors rounded-none px-4 py-2.5 w-full',
                  formButtonPrimary:
                    'bg-[#CDB4DB] text-[#13091B] font-bold text-xs uppercase tracking-wider hover:bg-[#FFC8DD] transition-colors rounded-none py-3 w-full',
                  footerActionLink: 'text-[#CDB4DB] hover:underline text-xs',
                  footer: 'hidden',
                },
              }}
            />
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#2E1C3F] py-6 text-center text-xs text-[#BDE0FE]/60 font-mono uppercase bg-[#1C1027]">
        &copy; {new Date().getFullYear()} ThinkEd Technologies Inc.
      </footer>
    </div>
  );
}
