/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#000000',
          card: '#09090b',
          border: '#18181b',
          hover: '#121215',
        }
      },
      borderRadius: {
        'none': '0px',
      },
      boxShadow: {
        'none': 'none',
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.08', fontWeight: '700', letterSpacing: '-0.03em' }],
        'heading': ['1.75rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }],
        'subheading': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],
      }
    },
  },
  plugins: [],
}
