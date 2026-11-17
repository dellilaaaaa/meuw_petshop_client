import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://meuw-petshop-server.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});