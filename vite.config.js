import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    // Inline small assets as base64 to save requests
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer': ['framer-motion'],
          'icons': ['react-icons'],
        },
      },
    },
    // Emit chunk size warnings above 600kb
    chunkSizeWarningLimit: 600,
  },

  // Faster dev server
  server: {
    hmr: true,
    proxy: {
      '/Livestock_Link_PK': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/islamic-website-2': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },

  // Pre-bundle all heavy deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-icons'],
  },
})
