import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: "./src/tests/setup.ts",
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  }
})
