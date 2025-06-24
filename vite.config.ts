import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'form': ['react-hook-form', '@hookform/resolvers/zod', 'zod'],
          'ui': ['lucide-react', 'sonner']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});