// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// --- START: Configuration for GitHub Pages Deployment ---

// 1. Set the repoName variable to the EXACT name of your GitHub repository.
const repoName = 'BearTok';

export default defineConfig({
  plugins: [react()],
  
  // 2. The 'base' property tells Vite how to generate asset paths.
  //    It ensures your links look like /BearTok/assets/... instead of just /assets/
  base: `/${repoName}/`,
  
  // 3. IMPORTANT: If you ever deploy to the root of a domain 
  //    (like yourname.github.io, not yourname.github.io/repo), 
  //    you should change 'base' to: base: './',
});

// --- END: Configuration for GitHub Pages Deployment ---`