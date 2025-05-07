// tailwind.config.js
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          orchid: '#9F2B68', // your custom color name
        },
      },
    },
    plugins: [],
  }
  