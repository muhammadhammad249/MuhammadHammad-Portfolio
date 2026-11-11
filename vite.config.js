import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function copyDirClean(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (
      entry.name === 'node_modules' || entry.name === '.git' ||
      entry.name === '.next' || entry.name === 'temp_daily_goal' ||
      entry.name === 'temp_netflix'
    ) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirClean(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function cleanPublicCopyPlugin() {
  return {
    name: 'clean-public-copy',
    apply: 'build',
    closeBundle() {
      const publicPath = path.resolve(__dirname, 'public');
      const distPath = path.resolve(__dirname, 'dist');
      copyDirClean(publicPath, distPath);
    }
  };
}

export default defineConfig(({ command }) => ({
  publicDir: command === 'serve' ? 'public' : false,
  plugins: [react(), cleanPublicCopyPlugin()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    // Inline very small assets as base64 — reduces requests
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        // Fine-grained manual chunks — browsers can cache unchanged chunks
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          if (id.includes('node_modules/emailjs')) {
            return 'emailjs';
          }
        },
        // Shorter, stable chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
      // Tree-shake aggressively
      treeshake: {
        moduleSideEffects: false,
        preset: 'recommended',
      },
    },
    chunkSizeWarningLimit: 600,
    // Write map files only in dev
    sourcemap: false,
  },
  server: {
    hmr: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-icons'],
  },
}));
