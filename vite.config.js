import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from https://minako-m.github.io/personal-website/
  base: '/personal-website/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
