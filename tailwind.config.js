/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      }
    },
  },
  plugins: [],
}