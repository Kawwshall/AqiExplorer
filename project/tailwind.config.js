/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aqi: {
          good: '#10B981',
          moderate: '#F59E0B',
          'unhealthy-sensitive': '#F97316',
          unhealthy: '#EF4444',
          'very-unhealthy': '#7C3AED',
          hazardous: '#991B1B'
        }
      }
    },
  },
  plugins: [],
};