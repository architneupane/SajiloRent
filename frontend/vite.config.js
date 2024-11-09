import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the Vite config
export default defineConfig({
  plugins: [react()],
  // No need for a base URL in local development
});
