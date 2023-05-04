module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        'auto': 'auto',
        '0': 0,
        '-1': -1,
      },
    },
  },
  plugins: [],
}