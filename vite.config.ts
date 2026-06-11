import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' keeps every asset URL relative, so the same build works on GitHub
// Pages no matter the repository name (project pages serve from /<repo>/).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // @tensorflow/tfjs is intentionally a single lazy chunk (~1.9 MB minified);
    // it only loads when the user opens the generator.
    chunkSizeWarningLimit: 2000,
  },
});
