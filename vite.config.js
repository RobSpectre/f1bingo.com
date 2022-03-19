import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "f1bingo.com",
  resolve: {
    alias: [ 
      { find: '@', replacement: '/src' }
    ]
  },
  plugins: [
    vue()
  ]
})
