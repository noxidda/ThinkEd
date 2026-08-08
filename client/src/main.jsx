import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import App from './App.jsx';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder_key_for_build';

const appearanceConfig = {
  baseTheme: dark,
  layout: {
    showOptionalFields: false,
    socialButtonsVariant: 'button',
  },
  variables: {
    colorPrimary: '#ffffff',
    colorBackground: '#09090b',
    colorText: '#ffffff',
    colorTextSecondary: '#d4d4d8',
    colorInputBackground: '#000000',
    colorInputText: '#ffffff',
    colorNeutral: '#ffffff',
    borderRadius: '0px',
    fontFamily: 'DM Sans, sans-serif',
  },
  elements: {
    footer: 'hidden',
    footerAction: 'hidden',
    footerPages: 'hidden',
    internal: 'hidden',
    logoBox: 'hidden',
    logoImage: 'hidden',
    modalBackdrop: 'bg-black/90 backdrop-blur-md',
    modalContent: 'bg-zinc-950 border border-zinc-700 shadow-2xl rounded-none p-0 overflow-hidden max-w-md w-full',
    card: 'bg-zinc-950 border border-zinc-700 p-8 shadow-none rounded-none w-full',
    headerTitle: 'text-white font-bold text-xl uppercase tracking-tight font-sans text-center',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton:
      'bg-black border border-zinc-700 text-white hover:bg-zinc-900 transition-colors text-xs font-semibold rounded-none py-3 justify-center tracking-wider',
    socialButtonsBlockButtonText: 'text-white font-medium text-xs font-sans',
    dividerLine: 'bg-zinc-700',
    dividerText: 'text-zinc-400 text-[10px] uppercase font-mono tracking-widest',
    formFieldLabel: 'text-zinc-300 font-semibold text-xs uppercase tracking-wider font-sans mb-1.5',
    formFieldInput:
      'bg-black border border-zinc-700 text-white text-sm focus:border-white transition-colors rounded-none px-4 py-3 font-sans w-full',
    formButtonPrimary:
      'bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-none py-3.5 w-full mt-2',
    identityPreviewText: 'text-white text-xs font-sans',
    identityPreviewEditButton: 'text-zinc-400 hover:text-white text-xs font-sans',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={appearanceConfig}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
