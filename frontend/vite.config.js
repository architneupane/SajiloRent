import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the Vite config
export default defineConfig({
  plugins: [react()],
  base: '/Docly/', // Replace with your GitHub repository name
});

