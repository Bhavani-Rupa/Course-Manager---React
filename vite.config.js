// Vite configuration for React app
// Ensures JSX is handled in .js files and sets dev server defaults
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Treat .js files in src as JSX-capable
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  server: {
    // Dev server port and auto-open in browser
    port: 3000,
    open: true
  }
})
