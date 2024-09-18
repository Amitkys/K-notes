import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allows access from your local network
    port: 5173,       // Optional, ensures it's running on port 5173
  },
  plugins: [react()],
  base: './'
})
