import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/garage-shop/', // <-- ТОЛЬКО имя репозитория со слэшами в начале и в конце!
})
