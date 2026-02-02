import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path set to root for Vercel/Netlify. 
  // Only use a subpath (e.g., '/repo-name/') if deploying to GitHub Pages project sites.
  base: '/', 
});