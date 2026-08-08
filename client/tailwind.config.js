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
        'mono': ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        palette: {
          1: '#CDB4DB',
          2: '#FFC8DD',
          3: '#FFAFCC',
          4: '#BDE0FE',
          5: '#A2D2FF',
        },
        surface: {
          DEFAULT: '#13091B',
          card: '#1C1027',
          border: '#2E1C3F',
          hover: '#261635',
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
