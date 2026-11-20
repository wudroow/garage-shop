import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/wudroow/garage-shop/', // Это нужно для GitHub Pages (название твоего репозитория)
})
