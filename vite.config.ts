import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default defineConfig({
  // Served from https://yanashingel.github.io/habit-bear/
  base: '/habit-bear/',
  plugins: [react(), tailwindcss()],
})
