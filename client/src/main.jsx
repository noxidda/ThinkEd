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
    colorPrimary: '#CDB4DB',
    colorBackground: '#1C1027',
    colorText: '#ffffff',
    colorTextSecondary: '#BDE0FE',
    colorInputBackground: '#13091B',
    colorInputText: '#ffffff',
    colorNeutral: '#CDB4DB',
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
    modalBackdrop: 'bg-[#13091B]/90 backdrop-blur-md',
    modalContent: 'bg-[#1C1027] border border-[#2E1C3F] shadow-2xl rounded-none p-0 overflow-hidden max-w-md w-full',
    card: 'bg-[#1C1027] border border-[#2E1C3F] p-8 shadow-none rounded-none w-full',
    headerTitle: 'text-[#FFC8DD] font-bold text-xl uppercase tracking-tight font-sans text-center',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton:
      'bg-[#13091B] border border-[#2E1C3F] text-[#BDE0FE] hover:bg-[#261635] transition-colors text-xs font-semibold rounded-none py-3 justify-center tracking-wider',
    socialButtonsBlockButtonText: 'text-[#BDE0FE] font-medium text-xs font-sans',
    dividerLine: 'bg-[#2E1C3F]',
    dividerText: 'text-[#BDE0FE] text-[10px] uppercase font-mono tracking-widest',
    formFieldLabel: 'text-[#BDE0FE] font-semibold text-xs uppercase tracking-wider font-sans mb-1.5',
    formFieldInput:
      'bg-[#13091B] border border-[#2E1C3F] text-white text-sm focus:border-[#CDB4DB] transition-colors rounded-none px-4 py-3 font-sans w-full',
    formButtonPrimary:
      'bg-[#CDB4DB] text-[#13091B] font-bold text-xs uppercase tracking-widest hover:bg-[#FFC8DD] transition-colors rounded-none py-3.5 w-full mt-2',
    identityPreviewText: 'text-white text-xs font-sans',
    identityPreviewEditButton: 'text-[#BDE0FE] hover:text-[#FFAFCC] text-xs font-sans',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={appearanceConfig}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
