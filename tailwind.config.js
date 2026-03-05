module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tire-soft': '#ff3333',   // Soft Red
        'tire-medium': '#ebd324', // Medium Yellow
        'tire-hard': '#ffffff',   // Hard White
        'tire-wet': '#00a0de',    // Wet Blue
        'tire-inters': '#67ac3a', // Inter Green
        darkgray: '#18181b', // zinc-900 (track black)
        gray: '#27272a',     // zinc-800
        'focus-blue': '#0284c7',
        lightgray: '#3f3f46' // zinc-700
      },
      fontSize: {
        'xxs': [
          '0.65rem', {
            lineHeight: '0.4rem',
            letterSpacing: '-0.02em'
          }
        ]
      }
    }
  }
}
