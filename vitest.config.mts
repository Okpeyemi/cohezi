import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': import.meta.dirname },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    css: false,
    // Le rendu de la page complète en jsdom dépasse 5 s quand les 30 fichiers tournent en parallèle.
    testTimeout: 20000,
  },
});
