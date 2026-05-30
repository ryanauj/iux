import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Headless harness config. Reuses the same React plugin as the app build so
// the test compositions compile identically, but swaps in a jsdom DOM and a
// setup file that polyfills the few browser APIs jsdom doesn't implement.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.headless.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
