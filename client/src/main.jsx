import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import App from './App.jsx';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder_key_for_build';

const appearanceConfig = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#ffffff',
    colorBackground: '#000000',
    colorText: '#ffffff',
    colorTextSecondary: '#a1a1aa',
    colorInputBackground: '#000000',
    colorInputText: '#ffffff',
    colorNeutral: '#ffffff',
    borderRadius: '0px',
    fontFamily: 'DM Sans, sans-serif',
  },
  elements: {
    card: 'bg-black border border-zinc-800 shadow-none rounded-none',
    modalContent: 'bg-black border border-zinc-800 shadow-none rounded-none',
    headerTitle: 'text-white font-bold uppercase tracking-tight',
    headerSubtitle: 'text-zinc-400 text-xs',
    socialButtonsBlockButton:
      'bg-black border border-zinc-800 text-white hover:bg-zinc-900 transition-colors text-xs font-semibold rounded-none py-2.5',
    socialButtonsBlockButtonText: 'text-white font-medium text-xs',
    dividerLine: 'bg-zinc-800',
    dividerText: 'text-zinc-500 text-[10px] uppercase font-mono',
    formFieldLabel: 'text-zinc-400 font-medium text-xs uppercase tracking-wider',
    formFieldInput:
      'bg-black border border-zinc-800 text-white text-sm focus:border-white transition-colors rounded-none px-4 py-2.5',
    formButtonPrimary:
      'bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors rounded-none py-3 w-full',
    footerActionLink: 'text-white hover:underline text-xs',
    footer: 'bg-black border-t border-zinc-800',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={appearanceConfig}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
